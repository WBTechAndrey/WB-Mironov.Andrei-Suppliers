interface StyleModule {
  [key: string]: string;
}

export const combinedClassNames = (
  classNames: Array<string>,
  style: StyleModule,
) =>
  classNames ? classNames.map((className) => style[className]).join(" ") : "";
