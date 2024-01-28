// fungsi untuk mengubag deskripsi cuaca dari api ke bahasa indonesia
export const weatherName = (name) => {
  let result;
  switch (name) {
    case "clear sky":
      result = "Langit Cerah";
      break;
    case "few clounds":
      result = "Sedikit Awan";
      break;
    case "scattered clouds":
      result = "Awan Tersebar";
      break;
    case "broken clouds":
      result = "Awan Pecah";
      break;
    case "overcast clouds":
      result = "Langit Mendung";
      break;
    case "mist":
      result = "Berkabut";
      break;
    case "smoke":
      result = "Berasap";
      break;
    case "haze":
      result = "Berkabut Tipis";
      break;
    case "dust":
      result = "Berdebu";
      break;
    case "fog":
      result = "Berkabut";
      break;
    case "sand":
      result = "Angin Berpasir";
      break;
    case "ash":
      result = "Hujan Abu Vulkanik";
      break;
    case "squall":
      result = "Hujan Lebat";
      break;
    case "tornado":
      result = "Tornado";
      break;
    case "thunderstrom":
      result = "Badai Petir";
      break;
    case "rain":
      result = "Hujan";
      break;
    case "moderate rain":
      result = "Hujan Sedang";
      break;
    case "light rain":
      result = "Gerimis";
      break;
    case "drizzle":
      result = "Gerimis";
      break;
    case "snow":
      result = "Salju";
      break;
    case "freezing rain":
      result = "Hujan Es";
      break;
    case "shower rain":
      result = "Hujan Lebat";
      break;
    case "sleet":
      result = "Hujan Salju";
      break;
    case "hail":
      result = "Hujan Es";
      break;
    case "thunderstorm with rain":
      result = "Hujan Petir";
      break;
    case "thunderstorm with light rain":
      result = "Hujan Petir";
      break;
    default:
      result = name;
      break;
  }
  return result;
};
