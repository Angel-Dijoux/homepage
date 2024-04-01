/* eslint-disable @typescript-eslint/no-explicit-any */

// SOURCE : https://sergiodxa.com/tutorials/react/suspense-image-loading

enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}

type Resource<Payload> = {
  read: () => Payload;
};

function createResource<Payload>(
  asyncFn: () => Promise<Payload>
): Resource<Payload> {
  let status: Status = Status.PENDING;
  let result: any;

  const promise = asyncFn().then(
    (r: Payload) => {
      status = Status.SUCCESS;
      result = r;
    },
    (e: Error) => {
      status = Status.ERROR;
      result = e;
    }
  );
  return {
    read(): Payload {
      switch (status) {
        case Status.PENDING:
          throw promise;
        case Status.ERROR:
          throw result;
        case Status.SUCCESS:
          return result;
      }
    },
  };
}

const cache = new Map<string, any>();

function loadImage(source: string): Resource<string> {
  let resource = cache.get(source);
  if (resource) return resource;
  resource = createResource<string>(
    () =>
      new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = source;
        img.addEventListener("load", () => resolve(source));
        img.addEventListener("error", () =>
          reject(new Error(`Failed to load image ${source}`))
        );
      })
  );
  cache.set(source, resource);
  return resource;
}

export function SuspenseImage(
  props: Readonly<React.ImgHTMLAttributes<HTMLImageElement>>
): JSX.Element {
  const { src, alt, ...rest } = props;

  if (!src) {
    throw new Error("Image source must be provided");
  }

  loadImage(src).read();
  return <img src={src} alt={alt ?? ""} {...rest} />;
}
