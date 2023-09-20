/**
 * A function to test whether a email is valid or not
 *
 * @param {String} email
 * @returns {Boolean}
 */
export function isValidEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

/**
 * A function to test whether a Phone number is valid or not
 *
 * @param {String} phoneNumber
 * @returns {Boolean}
 */
export function isValidPhoneNumber(phoneNumber) {
  var re = /^[0-9\-+]{8,15}$/;
  return re.test(phoneNumber.toString());
}

/**
 * A function to test that username should only contain alphabets.
 *
 * @param {String} userName
 * @returns
 */
export function isValidUserName(userName) {
  var re = /^[a-zA-Z\s]*$/;
  return re.test(userName.toString());
}

export function convertToGB(totalImages, baseSize) {
  const sizeInMBs = Number(totalImages) * Number(baseSize);
  const sizeInGBs = sizeInMBs / 1024;

  return sizeInGBs.toFixed(2);
}

export function deepEqual(a, b) {
  if (typeof a == "object" && a != null && typeof b == "object" && b != null) {
    var count = [0, 0];
    // eslint-disable-next-line no-unused-vars
    for (let key in a) count[0]++;
    // eslint-disable-next-line no-unused-vars
    for (let key in b) count[1]++;
    if (count[0] - count[1] != 0) {
      return false;
    }
    for (let key in a) {
      if (!(key in b) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    for (let key in b) {
      if (!(key in a) || !deepEqual(b[key], a[key])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}

export const getWebThumbnailURL = (url) => {
  return url.replace("/compress/", "/web-thumbnails/");
};

export async function getCorrectURL(url) {
  return new Promise((resolve) => {
    const digitalOceanURL =
      process.env.REACT_APP_DIGITAL_OCEAN_URL + url.split(".amazonaws.com/")[1];

    const image = new Image();
    image.src = digitalOceanURL;

    image.onload = () => {
      resolve(digitalOceanURL);
    };

    image.onerror = () => {
      resolve(url);
    };
  });
}

export function getCorrectURLNonAsync(url) {
  if (!url) return "";
  return (
    process.env.REACT_APP_DIGITAL_OCEAN_URL + url.split(".amazonaws.com/")[1]
  );
}

export function getDigitalOceanURL(url) {
  return (
    process.env.REACT_APP_DIGITAL_OCEAN_URL + url.split(".amazonaws.com/")[1]
  );
}

export function delay(time = 300) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function getCompressedURL(webthumbnailURL) {
  return webthumbnailURL.replace("/web-thumbnails/", "/compress/");
}

export const getWebThumbnailWithDigitalOcean = (url) => {
  const webThumbnailUrl = getWebThumbnailURL(url);
  return getDigitalOceanURL(webThumbnailUrl);
};
