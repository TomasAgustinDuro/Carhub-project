import Image from "../models/Image.js";
import { imageSchema } from "../validation/Image.schema.js";

export class ImageController {
  static async getAll(req, res) {
    try {
      const images = Image.getAll();

      return images;
    } catch (error) {}
  }

  static async insertImage(req, res) {
    const body = req.body;

    const validation = imageSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error.format());
      return;
    }

    const newImage = {
      title: body.title,
      description: body.description,
      url: body.url,
    };

    try {
      await Image.insertImage(newImage);
    } catch (error) {
      console.log(error);
    }
  }

  static async editImage(req, res) {
    const body = req.body;
    const id = req.params;

    const newImage = {
      title: body.title,
      description: body.description,
      url: body.url,
    };

    try {
      const imageUpdated = await Image.editImage(id, newImage);

      return imageUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  static async removeImage(req, res) {
    const id = req.params;

    try {
      await Image.removeImage(id);

      return console.log("borrado");
    } catch (error) {}
  }
}
