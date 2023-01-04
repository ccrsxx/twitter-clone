export type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: string;
})[];

export type ImagePreview = ImageData & { id: string };
export type FileWithId = File & { id: string };

export type FilesWithId = (File & {
  id: string;
})[];
