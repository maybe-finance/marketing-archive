const match = (text: string, searchProps: string): boolean => {
  // remove spaces, lower case the search so the search is case insensitive
  const search = searchProps.replace(/ /g, "").toLowerCase();
  let search_position = 0;

  // Go through each character in the text:
  for (let n = 0; n < text.length; n++) {
    if (text[n].toLowerCase() == search[search_position]) {
      search_position += 1;
    }

    // All search chars are already matched
    if (search_position == search.length) {
      return true;
    }
  }

  // Matched all query chars
  return false;
};

const highlight = (text: string, searchProps: string): string => {
  // remove spaces, lower case the search so the search is case insensitive
  const search = searchProps.replace(/ /g, "").toLowerCase();
  const tokens = [];
  let search_position = 0;

  if (search.length === 0) return text;

  // Go through each character in the text:
  for (let n = 0; n < text.length; n++) {
    let text_char = text[n];

    // if we match a character in the search, highlight it:
    if (
      search_position < search.length &&
      text_char.toLowerCase() == search[search_position]
    ) {
      text_char = '<span class="text-white">' + text_char + "</span>";
      search_position += 1;
    } else {
      text_char = '<span class="text-gray-500">' + text_char + "</span>";
    }

    tokens.push(text_char);
  }

  // If there are characters remaining in the search text, return an empty string to indicate no match:
  if (search_position != search.length) {
    return "";
  }

  return tokens.join("");
};

export default {
  match,
  highlight,
};
