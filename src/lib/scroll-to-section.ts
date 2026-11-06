import { AppSection } from "@/config/enums";

export function scrollToSectionElement(
  section: AppSection,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(section);
  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior, block: "start" });
  return true;
}
