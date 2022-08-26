const host = "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";
const query = "languages?keyword";

export async function getSuggestionsByKeyword(keyword) {
  return get(`${host}/${query}=${keyword}`);
}

async function get(url) {
  try {
    const response = await fetch(`${url}`);
    if (response.ok) {
      return response.json();
    } else {
      console.log("Server Error");
    }
  } catch (error) {
    console.log(error);
  }
}
