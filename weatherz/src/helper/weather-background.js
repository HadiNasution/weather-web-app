// fungsi untuk mengubah warna background berdasarkan kondisi cuaca
export const weatherBackground = (name) => {
  let result;
  switch (name) {
    case "clear sky":
      result =
        "linear-gradient(0deg, rgba(253,255,235,1) 0%, rgba(255,254,180,1) 35%, rgba(255,225,113,1) 94%)";
      break;
    case "few clounds":
      result =
        "linear-gradient(0deg, rgba(202,253,255,1) 0%, rgba(180,250,255,1) 35%, rgba(0,212,255,1) 100%)";
      break;
    case "scattered clouds":
      result =
        "linear-gradient(0deg, rgba(202,253,255,1) 0%, rgba(180,250,255,1) 35%, rgba(0,212,255,1) 100%)";
      break;
    case "broken clouds":
      result =
        "linear-gradient(0deg, rgba(202,253,255,1) 0%, rgba(180,250,255,1) 35%, rgba(0,212,255,1) 100%)";
      break;
    case "overcast clouds":
      result =
        "linear-gradient(0deg, rgba(79,150,153,1) 0%, rgba(55,173,181,1) 35%, rgba(25,125,145,1) 100%)";
      break;
    case "mist":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "smoke":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "haze":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "dust":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "fog":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "sand":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(163,248,255,1) 35%, rgba(53,222,255,1) 94%)";
      break;
    case "ash":
      result =
        "linear-gradient(0deg, rgba(50,94,96,1) 0%, rgba(38,113,119,1) 35%, rgba(5,51,60,1) 100%)";
      break;
    case "squall":
      result =
        "linear-gradient(0deg, rgba(50,94,96,1) 0%, rgba(38,113,119,1) 35%, rgba(5,51,60,1) 100%)";
      break;
    case "tornado":
      result =
        "linear-gradient(0deg, rgba(50,94,96,1) 0%, rgba(38,113,119,1) 35%, rgba(5,51,60,1) 100%)";
      break;
    case "thunderstrom":
      result =
        "linear-gradient(0deg, rgba(50,94,96,1) 0%, rgba(38,113,119,1) 35%, rgba(5,51,60,1) 100%)";
      break;
    case "rain":
      result =
        "linear-gradient(0deg, rgba(116,235,240,1) 0%, rgba(70,186,196,1) 35%, rgba(21,135,157,1) 100%)";
      break;
    case "drizzle":
      result =
        "linear-gradient(0deg, rgba(116,235,240,1) 0%, rgba(70,186,196,1) 35%, rgba(21,135,157,1) 100%)";
      break;
    case "snow":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(47,202,224,1) 35%, rgba(113,195,255,1) 94%)";
      break;
    case "freezing rain":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(47,202,224,1) 35%, rgba(113,195,255,1) 94%)";
      break;
    case "shower rain":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(47,202,224,1) 35%, rgba(113,195,255,1) 94%)";
      break;
    case "sleet":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(47,202,224,1) 35%, rgba(113,195,255,1) 94%)";
      break;
    case "hail":
      result =
        "linear-gradient(0deg, rgba(191,253,255,1) 0%, rgba(47,202,224,1) 35%, rgba(113,195,255,1) 94%)";
      break;
    default:
      result =
        "linear-gradient(0deg, rgba(202,253,255,1) 0%, rgba(180,250,255,1) 35%, rgba(0,212,255,1) 100%)";
      break;
  }
  return result;
};
