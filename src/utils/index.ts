export function isStandaloneMode() {
  if (typeof window !== "undefined") {
    if (
      // @ts-ignore
      window.navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function capitalizeFirstLetter(word: string) {
  if (!word || !word.length) {
    return null;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
type Address = {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
};

export function formatAddress(address: Address) {
  const optional = address.line2 ? `${address.line2}` : " ";
  return `${address.line1}${optional}${address.state} ${address.postal_code}, ${address.country}`;
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPercent(num: number) {
  return Math.round(num);
}

export const getDate = (days: number) => {
  const offset = Math.random() * 60;
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setMinutes(offset);

  return date;
};

export function formatCardNumber(s: string) {
  return s.replace(/\d{4}(?=.)/g, "$& ");
}

export function normalizeByKey(arr: any[], key: string) {
  const normalized = arr.reduce((acc, val) => {
    return {
      ...acc,
      [val[key]]: val,
    };
  }, {});

  return normalized;
}

export function formatSnakeCase(s: string) {
  if (!s || !s.length) {
    return null;
  }

  return s
    .split("_")
    .map((part: string) => capitalizeFirstLetter(part))
    .join(" ");
}

export function groupBy(arr: any[], callback: any) {
  if (!Array.isArray(arr)) {
    throw new Error("expected an array for first argument");
  }

  if (typeof callback !== "function") {
    throw new Error("expected a function for second argument");
  }

  let result: any = {};
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];
    let bucketCategory = callback(item);
    let bucket = result[bucketCategory];

    if (!Array.isArray(bucket)) {
      result[bucketCategory] = [item];
    } else {
      result[bucketCategory].push(item);
    }
  }

  return result;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const getRandomName = () => {
  const randomNames = [
    "Jonas Johanes",
    "James Bay",
    "John Collins",
    "Robert Half",
    "Michael Schumi",
    "William Goss",
    "David Davidson",
    "Richard Brandy",
    "Mary Kate Ashleydson",
    "Patricia Meadow",
    "Linda Clingla",
    "Barbara Golden",
    "Elizabeth Smith",
    "Jennifer Luwanda",
  ];

  return randomNames[getRandomInt(randomNames.length)];
};

export function getInitials(name: string) {
  var names = name.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export const fillWithRandom = (max: number, total: number, len: number = 4) => {
  let arr = new Array(len);
  let sum = 0;
  do {
    for (let i = 0; i < len; i++) {
      arr[i] = Math.random();
    }
    sum = arr.reduce((acc, val) => acc + val, 0);
    const scale = (total - len) / sum;
    arr = arr.map((val) => Math.min(max, Math.round(val * scale) + 1));
    sum = arr.reduce((acc, val) => acc + val, 0);
  } while (sum - total);
  return arr;
};
