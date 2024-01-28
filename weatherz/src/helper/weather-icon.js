// fungsi untuk mengubah icon cuaca berdasarkan kondisi cuaca
export const weatherIcon = (name) => {
  let result;
  switch (name) {
    case "clear sky":
      result = "public/assets/cerah.png";
      break;
    case "few clounds":
      result = "public/assets/berawan.png";
      break;
    case "scattered clouds":
      result = "public/assets/awan.png";
      break;
    case "broken clouds":
      result = "public/assets/berawan.png";
      break;
    case "overcast clouds":
      result = "public/assets/mendung.png";
      break;
    case "mist":
      result = "public/assets/awan.png";
      break;
    case "smoke":
      result = "public/assets/awan.png";
      break;
    case "haze":
      result = "public/assets/awan.png";
      break;
    case "dust":
      result = "public/assets/awan.png";
      break;
    case "fog":
      result = "public/assets/awan.png";
      break;
    case "sand":
      result = "public/assets/awan.png";
      break;
    case "ash":
      result = "public/assets/tornado.png";
      break;
    case "squall":
      result = "public/assets/hujan-petir.png";
      break;
    case "tornado":
      result = "public/assets/badai.png";
      break;
    case "thunderstrom":
      result = "public/assets/hujan-petir.png";
      break;
    case "rain":
      result = "public/assets/hujan.png";
      break;
    case "moderate rain":
      result = "public/assets/hujan.png";
      break;
    case "light rain":
      result = "public/assets/hujan-terang.png";
      break;
    case "drizzle":
      result = "public/assets/hujan.png";
      break;
    case "snow":
      result = "public/assets/salju.png";
      break;
    case "freezing rain":
      result = "public/assets/salju.png";
      break;
    case "shower rain":
      result = "public/assets/hujan-terang.png";
      break;
    case "sleet":
      result = "public/assets/salju.png";
      break;
    case "hail":
      result = "public/assets/salju.png";
      break;
    default:
      result = "public/assets/cerah.png";
      break;
  }
  return result;
};
