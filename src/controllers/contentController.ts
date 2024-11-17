import { Request, Response } from "express";
import { Content } from "../models/ContentSchema";
import { z } from "zod";

const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid URL format"),
  type: z.string().min(1, "Type is required"),
});

const contentIdSchema = z.object({
  id: z.string().uuid("Invalid content ID format"),
});

export const createContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, link, type } = createContentSchema.parse(req.body);
    await Content.create({ title, link, type, userId: req.userId, tags: [] });

    res.status(201).json({ message: "Content created successfully" });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "Failed to create content" });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const contents = await Content.find({ userId: req.userId });

    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve content" });
  }
};

export const deleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = contentIdSchema.parse(req.params);

    const deletedContent = await Content.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedContent) {
      res.status(404).json({ error: "Content not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({ error: "Failed to delete content" });
  }
};
