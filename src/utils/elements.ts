import ElementType from "../types/elementType";

export const elementTypeToDisplayName = (elementType: ElementType) => {
  const tagName = elementType.tagName.toLowerCase();
  const id = elementType.id.length > 0 ? `#${elementType.id}` : "";
  const className = elementType.className
    .split(" ")
    .filter((c) => c !== "")
    .map((c) => `.${c}`)
    .join("");
  return `${tagName}${id}${className}`;
};
