import { Request, Response } from "express";

import { albumsModel } from "../models/Albums";
import { photosModel } from "../models/Photos";

export const deleteAlbum = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { albumid } = req.body;
    const albumidArr = await albumid.split(",");
    const resultSort = await albumsModel.deleteMany({
      title: { $in: albumidArr },
    });
    await photosModel.deleteMany({ albumId: { $in: albumidArr } });
    return res.status(200).json(resultSort);
  } catch (err) {
    res.status(400).json({
      error: "delete album error",
    });
  }
};

export const changeAlbumTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { albumid, new_album_name } = req.body;
    const resultUpdate = await albumsModel.updateOne(
      { albumId: albumid },
      { $set: { title: new_album_name } }
    );
    return res.status(200).json(resultUpdate);
  } catch (err) {
    res.status(400).json({
      error: "get foto error",
    });
  }
};
