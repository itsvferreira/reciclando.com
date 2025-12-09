export const scrollToView = (errorField) => {
  if (errorField) {
    const element = document.getElementById(errorField);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
