export interface CityArea {
  name: string;
  lat: number;
  lng: number;
}

export interface City {
  name: string;
  state: string;
  lat: number;
  lng: number;
  zoom: number;
  areas: CityArea[];
}

export const INDIAN_CITIES: City[] = [
  // ─── DEFAULT: DELHI ───────────────────────────────────────────────────────
  {
    name: "Delhi",
    state: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    zoom: 11,
    areas: [
      { name: "Connaught Place", lat: 28.6315, lng: 77.2167 },
      { name: "Karol Bagh", lat: 28.6517, lng: 77.1909 },
      { name: "Lajpat Nagar", lat: 28.5677, lng: 77.2433 },
      { name: "Dwarka", lat: 28.5921, lng: 77.046 },
      { name: "Rohini", lat: 28.745, lng: 77.1139 },
      { name: "South Extension", lat: 28.5683, lng: 77.2262 },
      { name: "Vasant Kunj", lat: 28.5383, lng: 77.1552 },
    ],
  },
  // ─── TIER 1 CITIES ────────────────────────────────────────────────────────
  {
    name: "Mumbai",
    state: "Maharashtra",
    lat: 19.076,
    lng: 72.8777,
    zoom: 12,
    areas: [
      { name: "Andheri", lat: 19.1136, lng: 72.8697 },
      { name: "Bandra", lat: 19.0596, lng: 72.8295 },
      { name: "Dadar", lat: 19.018, lng: 72.8427 },
      { name: "Borivali", lat: 19.2307, lng: 72.8567 },
      { name: "Kurla", lat: 19.065, lng: 72.879 },
      { name: "Mulund", lat: 19.1715, lng: 72.956 },
      { name: "Malad", lat: 19.186, lng: 72.8484 },
    ],
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    zoom: 12,
    areas: [
      { name: "Koramangala", lat: 12.9279, lng: 77.6271 },
      { name: "Whitefield", lat: 12.9698, lng: 77.7499 },
      { name: "Indiranagar", lat: 12.9784, lng: 77.6408 },
      { name: "Electronic City", lat: 12.8458, lng: 77.6622 },
      { name: "Jayanagar", lat: 12.9308, lng: 77.5838 },
      { name: "HSR Layout", lat: 12.9119, lng: 77.6481 },
    ],
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    lat: 17.385,
    lng: 78.4867,
    zoom: 12,
    areas: [
      { name: "Banjara Hills", lat: 17.4156, lng: 78.4347 },
      { name: "Gachibowli", lat: 17.44, lng: 78.3489 },
      { name: "Hitech City", lat: 17.4504, lng: 78.3808 },
      { name: "Secunderabad", lat: 17.4399, lng: 78.4983 },
      { name: "Ameerpet", lat: 17.4375, lng: 78.4482 },
      { name: "Kukatpally", lat: 17.4849, lng: 78.4138 },
    ],
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    lat: 13.0827,
    lng: 80.2707,
    zoom: 12,
    areas: [
      { name: "T. Nagar", lat: 13.0418, lng: 80.2341 },
      { name: "Anna Nagar", lat: 13.0891, lng: 80.2094 },
      { name: "Velachery", lat: 12.9815, lng: 80.2176 },
      { name: "Adyar", lat: 13.0012, lng: 80.2565 },
      { name: "Tambaram", lat: 12.9229, lng: 80.1275 },
      { name: "Guindy", lat: 13.0067, lng: 80.2206 },
    ],
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    lat: 22.5726,
    lng: 88.3639,
    zoom: 12,
    areas: [
      { name: "Park Street", lat: 22.5533, lng: 88.3525 },
      { name: "Salt Lake", lat: 22.5755, lng: 88.4194 },
      { name: "Howrah", lat: 22.5958, lng: 88.2636 },
      { name: "Dum Dum", lat: 22.6513, lng: 88.3994 },
      { name: "New Town", lat: 22.5965, lng: 88.4782 },
      { name: "Rajarhat", lat: 22.6211, lng: 88.4489 },
    ],
  },
  // ─── TIER 2 CITIES ────────────────────────────────────────────────────────
  {
    name: "Pune",
    state: "Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    zoom: 12,
    areas: [
      { name: "Koregaon Park", lat: 18.5362, lng: 73.8938 },
      { name: "Hinjewadi", lat: 18.5912, lng: 73.7389 },
      { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
      { name: "Baner", lat: 18.5592, lng: 73.7868 },
      { name: "Hadapsar", lat: 18.5089, lng: 73.9259 },
      { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
    ],
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    zoom: 12,
    areas: [
      { name: "Navrangpura", lat: 23.0328, lng: 72.5592 },
      { name: "Satellite", lat: 23.0113, lng: 72.5109 },
      { name: "Maninagar", lat: 22.9986, lng: 72.6041 },
      { name: "Bopal", lat: 23.0312, lng: 72.4687 },
      { name: "Vastrapur", lat: 23.0314, lng: 72.5269 },
      { name: "SG Highway", lat: 23.0535, lng: 72.515 },
    ],
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
    zoom: 12,
    areas: [
      { name: "Malviya Nagar", lat: 26.8573, lng: 75.8089 },
      { name: "Vaishali Nagar", lat: 26.9256, lng: 75.7393 },
      { name: "Mansarovar", lat: 26.8536, lng: 75.7537 },
      { name: "C-Scheme", lat: 26.9073, lng: 75.8005 },
      { name: "Jagatpura", lat: 26.8348, lng: 75.8459 },
      { name: "Tonk Road", lat: 26.8763, lng: 75.7996 },
    ],
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    zoom: 12,
    areas: [
      { name: "Hazratganj", lat: 26.8542, lng: 80.9426 },
      { name: "Gomti Nagar", lat: 26.8526, lng: 81.0091 },
      { name: "Aliganj", lat: 26.8798, lng: 80.9457 },
      { name: "Indira Nagar", lat: 26.8859, lng: 81.0028 },
      { name: "Alambagh", lat: 26.8254, lng: 80.9059 },
      { name: "Jankipuram", lat: 26.914, lng: 80.9482 },
    ],
  },
  {
    name: "Kanpur",
    state: "Uttar Pradesh",
    lat: 26.4499,
    lng: 80.3319,
    zoom: 12,
    areas: [
      { name: "Civil Lines", lat: 26.4738, lng: 80.3536 },
      { name: "Kidwai Nagar", lat: 26.4415, lng: 80.3121 },
      { name: "Swaroop Nagar", lat: 26.4786, lng: 80.3033 },
      { name: "Kakadeo", lat: 26.4878, lng: 80.2871 },
      { name: "Lal Bangla", lat: 26.4254, lng: 80.3324 },
    ],
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    lat: 21.1458,
    lng: 79.0882,
    zoom: 12,
    areas: [
      { name: "Dharampeth", lat: 21.1412, lng: 79.0682 },
      { name: "Sitabuldi", lat: 21.1516, lng: 79.0879 },
      { name: "Sadar", lat: 21.1582, lng: 79.0745 },
      { name: "Manish Nagar", lat: 21.1089, lng: 79.0591 },
      { name: "Wardha Road", lat: 21.1096, lng: 79.1254 },
      { name: "Ramdaspeth", lat: 21.1413, lng: 79.0844 },
    ],
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    lat: 17.6868,
    lng: 83.2185,
    zoom: 12,
    areas: [
      { name: "Gajuwaka", lat: 17.6867, lng: 83.2073 },
      { name: "MVP Colony", lat: 17.7286, lng: 83.3292 },
      { name: "Rushikonda", lat: 17.7628, lng: 83.3796 },
      { name: "Madhurawada", lat: 17.7818, lng: 83.3664 },
      { name: "Dwaraka Nagar", lat: 17.7309, lng: 83.3075 },
      { name: "Seethammadhara", lat: 17.7444, lng: 83.3168 },
    ],
  },
  {
    name: "Indore",
    state: "Madhya Pradesh",
    lat: 22.7196,
    lng: 75.8577,
    zoom: 12,
    areas: [
      { name: "Vijay Nagar", lat: 22.7534, lng: 75.8937 },
      { name: "Palasia", lat: 22.7218, lng: 75.876 },
      { name: "Rau", lat: 22.6445, lng: 75.8148 },
      { name: "Scheme 54", lat: 22.7281, lng: 75.9243 },
      { name: "LIG Colony", lat: 22.7008, lng: 75.8773 },
      { name: "Sapna Sangeeta", lat: 22.7161, lng: 75.8808 },
    ],
  },
  {
    name: "Thane",
    state: "Maharashtra",
    lat: 19.2183,
    lng: 72.9781,
    zoom: 12,
    areas: [
      { name: "Ghodbunder Road", lat: 19.2565, lng: 72.975 },
      { name: "Kasarvadavali", lat: 19.2679, lng: 72.9699 },
      { name: "Manpada", lat: 19.2186, lng: 72.9784 },
      { name: "Vartak Nagar", lat: 19.2038, lng: 72.9722 },
      { name: "Kopri", lat: 19.193, lng: 72.9678 },
    ],
  },
  // ─── GUJARAT CITIES ───────────────────────────────────────────────────────
  {
    name: "Vadodara",
    state: "Gujarat",
    lat: 22.3072,
    lng: 73.1812,
    zoom: 12,
    areas: [
      { name: "Alkapuri", lat: 22.3119, lng: 73.1723 },
      { name: "Fatehgunj", lat: 22.3217, lng: 73.1851 },
      { name: "Manjalpur", lat: 22.2698, lng: 73.1759 },
      { name: "Waghodia Road", lat: 22.3372, lng: 73.2198 },
      { name: "Airport Area", lat: 22.3362, lng: 73.2269 },
      { name: "Gotri", lat: 22.3234, lng: 73.1534 },
    ],
  },
  {
    name: "Surat",
    state: "Gujarat",
    lat: 21.1702,
    lng: 72.8311,
    zoom: 12,
    areas: [
      { name: "Adajan", lat: 21.2034, lng: 72.7969 },
      { name: "Vesu", lat: 21.1477, lng: 72.7855 },
      { name: "Udhna", lat: 21.1573, lng: 72.8543 },
      { name: "Athwa", lat: 21.1811, lng: 72.8144 },
      { name: "Majura Gate", lat: 21.198, lng: 72.8348 },
      { name: "Varachha", lat: 21.215, lng: 72.8495 },
    ],
  },
  {
    name: "Rajkot",
    state: "Gujarat",
    lat: 22.3039,
    lng: 70.8022,
    zoom: 12,
    areas: [
      { name: "Kotecha Chowk", lat: 22.2906, lng: 70.799 },
      { name: "150 Feet Ring Road", lat: 22.2653, lng: 70.7822 },
      { name: "Kalavad Road", lat: 22.3124, lng: 70.7574 },
      { name: "Sadhu Vasvani", lat: 22.3089, lng: 70.7565 },
      { name: "Gondal Road", lat: 22.2695, lng: 70.7921 },
    ],
  },
  {
    name: "Gandhinagar",
    state: "Gujarat",
    lat: 23.2156,
    lng: 72.6369,
    zoom: 12,
    areas: [
      { name: "Sector 11", lat: 23.2298, lng: 72.6473 },
      { name: "Sector 21", lat: 23.2209, lng: 72.6525 },
      { name: "Gift City", lat: 23.1689, lng: 72.598 },
      { name: "Kudasan", lat: 23.2048, lng: 72.6369 },
      { name: "Infocity", lat: 23.2115, lng: 72.6873 },
    ],
  },
  // ─── SOUTH INDIAN CITIES ──────────────────────────────────────────────────
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.0168,
    lng: 76.9558,
    zoom: 12,
    areas: [
      { name: "RS Puram", lat: 11.0075, lng: 76.9428 },
      { name: "Gandhipuram", lat: 11.0188, lng: 76.9708 },
      { name: "Peelamedu", lat: 11.0269, lng: 77.0243 },
      { name: "Saibaba Colony", lat: 11.0252, lng: 76.9388 },
      { name: "Hopes College", lat: 11.0396, lng: 77.0038 },
      { name: "Race Course", lat: 11.0097, lng: 76.9703 },
    ],
  },
  {
    name: "Madurai",
    state: "Tamil Nadu",
    lat: 9.9252,
    lng: 78.1198,
    zoom: 12,
    areas: [
      { name: "Anna Nagar", lat: 9.9312, lng: 78.1237 },
      { name: "KK Nagar", lat: 9.9318, lng: 78.1438 },
      { name: "Mattuthavani", lat: 9.9531, lng: 78.1399 },
      { name: "Thiruparankundram", lat: 9.8795, lng: 78.0657 },
      { name: "Villapuram", lat: 9.9212, lng: 78.0898 },
    ],
  },
  {
    name: "Kochi",
    state: "Kerala",
    lat: 9.9312,
    lng: 76.2673,
    zoom: 12,
    areas: [
      { name: "Ernakulam", lat: 9.9816, lng: 76.2999 },
      { name: "Kakkanad", lat: 10.0121, lng: 76.3427 },
      { name: "Aluva", lat: 10.1099, lng: 76.3568 },
      { name: "Edapally", lat: 10.0178, lng: 76.3048 },
      { name: "Marine Drive", lat: 9.9662, lng: 76.2883 },
      { name: "Fort Kochi", lat: 9.9664, lng: 76.2431 },
    ],
  },
  {
    name: "Thiruvananthapuram",
    state: "Kerala",
    lat: 8.5241,
    lng: 76.9366,
    zoom: 12,
    areas: [
      { name: "Kowdiar", lat: 8.5161, lng: 76.9588 },
      { name: "Pattom", lat: 8.5244, lng: 76.9406 },
      { name: "Kesavadasapuram", lat: 8.5426, lng: 76.9386 },
      { name: "Technopark", lat: 8.5566, lng: 76.8819 },
      { name: "Peroorkada", lat: 8.5069, lng: 76.9755 },
    ],
  },
  {
    name: "Mysore",
    state: "Karnataka",
    lat: 12.2958,
    lng: 76.6394,
    zoom: 12,
    areas: [
      { name: "Vontikoppal", lat: 12.3206, lng: 76.6511 },
      { name: "Gokulam", lat: 12.3252, lng: 76.6276 },
      { name: "Kuvempu Nagar", lat: 12.2874, lng: 76.6198 },
      { name: "Vijayanagar", lat: 12.3267, lng: 76.5998 },
      { name: "Nanjangud Road", lat: 12.2261, lng: 76.681 },
    ],
  },
  // ─── NORTH INDIAN CITIES ──────────────────────────────────────────────────
  {
    name: "Chandigarh",
    state: "Punjab",
    lat: 30.7333,
    lng: 76.7794,
    zoom: 12,
    areas: [
      { name: "Sector 17", lat: 30.7399, lng: 76.7839 },
      { name: "Sector 22", lat: 30.7272, lng: 76.7904 },
      { name: "Panchkula", lat: 30.6942, lng: 76.8606 },
      { name: "Mohali", lat: 30.7046, lng: 76.7179 },
      { name: "IT Park", lat: 30.7165, lng: 76.8076 },
      { name: "Sector 35", lat: 30.7297, lng: 76.7655 },
    ],
  },
  {
    name: "Ludhiana",
    state: "Punjab",
    lat: 30.901,
    lng: 75.8573,
    zoom: 12,
    areas: [
      { name: "Ferozepur Road", lat: 30.8888, lng: 75.8358 },
      { name: "Model Town", lat: 30.8742, lng: 75.8718 },
      { name: "Dugri", lat: 30.8613, lng: 75.8408 },
      { name: "Rajguru Nagar", lat: 30.8815, lng: 75.833 },
      { name: "Pakhowal Road", lat: 30.897, lng: 75.8247 },
    ],
  },
  {
    name: "Amritsar",
    state: "Punjab",
    lat: 31.634,
    lng: 74.8723,
    zoom: 12,
    areas: [
      { name: "Ranjit Avenue", lat: 31.658, lng: 74.8769 },
      { name: "Lawrence Road", lat: 31.6366, lng: 74.8758 },
      { name: "Majitha Road", lat: 31.6275, lng: 74.912 },
      { name: "Putlighar", lat: 31.6415, lng: 74.8754 },
      { name: "Batala Road", lat: 31.6498, lng: 74.8969 },
    ],
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    lat: 30.3165,
    lng: 78.0322,
    zoom: 12,
    areas: [
      { name: "Rajpur Road", lat: 30.3456, lng: 78.0618 },
      { name: "Ballupur", lat: 30.3296, lng: 78.048 },
      { name: "Sahastradhara Road", lat: 30.3893, lng: 78.1014 },
      { name: "ISBT", lat: 30.3148, lng: 78.0308 },
      { name: "Prem Nagar", lat: 30.2993, lng: 78.0114 },
    ],
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3176,
    lng: 82.9739,
    zoom: 12,
    areas: [
      { name: "Lanka", lat: 25.2834, lng: 82.9994 },
      { name: "Bhelupur", lat: 25.2978, lng: 82.9986 },
      { name: "Sigra", lat: 25.3164, lng: 82.9963 },
      { name: "Chetganj", lat: 25.3218, lng: 83.0111 },
      { name: "Mahmoorganj", lat: 25.3128, lng: 82.987 },
    ],
  },
  // ─── EAST & NORTHEAST CITIES ──────────────────────────────────────────────
  {
    name: "Bhubaneswar",
    state: "Odisha",
    lat: 20.2961,
    lng: 85.8245,
    zoom: 12,
    areas: [
      { name: "Sahid Nagar", lat: 20.2946, lng: 85.8433 },
      { name: "Patia", lat: 20.3538, lng: 85.8215 },
      { name: "Khandagiri", lat: 20.2567, lng: 85.7791 },
      { name: "Nayapalli", lat: 20.2888, lng: 85.8188 },
      { name: "Jayadev Vihar", lat: 20.3024, lng: 85.8179 },
    ],
  },
  {
    name: "Patna",
    state: "Bihar",
    lat: 25.5941,
    lng: 85.1376,
    zoom: 12,
    areas: [
      { name: "Boring Road", lat: 25.6108, lng: 85.104 },
      { name: "Rajendra Nagar", lat: 25.5899, lng: 85.0994 },
      { name: "Kankarbagh", lat: 25.5899, lng: 85.1491 },
      { name: "Danapur", lat: 25.6143, lng: 85.0507 },
      { name: "Patliputra", lat: 25.6289, lng: 85.0774 },
      { name: "Kumhrar", lat: 25.5861, lng: 85.1665 },
    ],
  },
  {
    name: "Guwahati",
    state: "Assam",
    lat: 26.1445,
    lng: 91.7362,
    zoom: 12,
    areas: [
      { name: "Dispur", lat: 26.1433, lng: 91.7898 },
      { name: "GS Road", lat: 26.1491, lng: 91.7863 },
      { name: "Zoo Road", lat: 26.162, lng: 91.7916 },
      { name: "Maligaon", lat: 26.176, lng: 91.6949 },
      { name: "Beltola", lat: 26.1097, lng: 91.7837 },
    ],
  },
  // ─── CENTRAL INDIAN CITIES ────────────────────────────────────────────────
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    lat: 23.2599,
    lng: 77.4126,
    zoom: 12,
    areas: [
      { name: "Arera Colony", lat: 23.2153, lng: 77.4305 },
      { name: "MP Nagar", lat: 23.2345, lng: 77.4348 },
      { name: "Kolar Road", lat: 23.172, lng: 77.4438 },
      { name: "Shahpura", lat: 23.1957, lng: 77.4647 },
      { name: "Habibganj", lat: 23.2296, lng: 77.4393 },
      { name: "Bairagarh", lat: 23.2758, lng: 77.4246 },
    ],
  },
  {
    name: "Raipur",
    state: "Chhattisgarh",
    lat: 21.2514,
    lng: 81.6296,
    zoom: 12,
    areas: [
      { name: "Telibandha", lat: 21.2386, lng: 81.6521 },
      { name: "Shankar Nagar", lat: 21.2376, lng: 81.6461 },
      { name: "Pandri", lat: 21.2491, lng: 81.6633 },
      { name: "Dhamtari Road", lat: 21.2079, lng: 81.6224 },
      { name: "Tatibandh", lat: 21.2017, lng: 81.6744 },
    ],
  },
  {
    name: "Jabalpur",
    state: "Madhya Pradesh",
    lat: 23.1815,
    lng: 79.9864,
    zoom: 12,
    areas: [
      { name: "Civic Centre", lat: 23.1637, lng: 79.9367 },
      { name: "Gorakhpur", lat: 23.1954, lng: 79.9798 },
      { name: "Wright Town", lat: 23.1518, lng: 79.9405 },
      { name: "Vijay Nagar", lat: 23.1795, lng: 79.9452 },
      { name: "Napier Town", lat: 23.1667, lng: 79.9316 },
    ],
  },
  // ─── WEST INDIAN CITIES ───────────────────────────────────────────────────
  {
    name: "Nashik",
    state: "Maharashtra",
    lat: 19.9975,
    lng: 73.7898,
    zoom: 12,
    areas: [
      { name: "College Road", lat: 19.9948, lng: 73.7779 },
      { name: "Gangapur Road", lat: 19.9867, lng: 73.7526 },
      { name: "Satpur", lat: 19.9962, lng: 73.7356 },
      { name: "Indira Nagar", lat: 20.0148, lng: 73.7592 },
      { name: "Panchavati", lat: 20.0048, lng: 73.7918 },
    ],
  },
  {
    name: "Aurangabad",
    state: "Maharashtra",
    lat: 19.8762,
    lng: 75.3433,
    zoom: 12,
    areas: [
      { name: "CIDCO", lat: 19.8762, lng: 75.3433 },
      { name: "Garkheda", lat: 19.8666, lng: 75.3407 },
      { name: "Osmanpura", lat: 19.8898, lng: 75.3274 },
      { name: "Shahganj", lat: 19.8764, lng: 75.3538 },
      { name: "Samarth Nagar", lat: 19.8853, lng: 75.3439 },
    ],
  },
  {
    name: "Jodhpur",
    state: "Rajasthan",
    lat: 26.2389,
    lng: 73.0243,
    zoom: 12,
    areas: [
      { name: "Paota", lat: 26.267, lng: 73.0314 },
      { name: "Ratanada", lat: 26.2754, lng: 73.0239 },
      { name: "Shastri Nagar", lat: 26.2695, lng: 73.0139 },
      { name: "Sardarpura", lat: 26.2723, lng: 73.0362 },
      { name: "Basni", lat: 26.2456, lng: 73.0333 },
    ],
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    lat: 24.5854,
    lng: 73.7125,
    zoom: 12,
    areas: [
      { name: "Fatehpura", lat: 24.5861, lng: 73.7046 },
      { name: "Sukhadia Circle", lat: 24.5997, lng: 73.6882 },
      { name: "Hiran Magri", lat: 24.5704, lng: 73.7245 },
      { name: "Ambamata", lat: 24.5829, lng: 73.701 },
      { name: "Shobhagpura", lat: 24.6042, lng: 73.7318 },
    ],
  },
  // ─── MORE IMPORTANT CITIES ────────────────────────────────────────────────
  {
    name: "Goa (Panaji)",
    state: "Goa",
    lat: 15.4909,
    lng: 73.8278,
    zoom: 12,
    areas: [
      { name: "Miramar", lat: 15.4809, lng: 73.819 },
      { name: "Campal", lat: 15.4988, lng: 73.8248 },
      { name: "Altinho", lat: 15.4959, lng: 73.8309 },
      { name: "Caranzalem", lat: 15.4751, lng: 73.8147 },
      { name: "St. Inez", lat: 15.4885, lng: 73.8336 },
    ],
  },
  {
    name: "Ranchi",
    state: "Jharkhand",
    lat: 23.3441,
    lng: 85.3096,
    zoom: 12,
    areas: [
      { name: "Doranda", lat: 23.3396, lng: 85.323 },
      { name: "Hinoo", lat: 23.3508, lng: 85.332 },
      { name: "Lalpur", lat: 23.3717, lng: 85.3349 },
      { name: "Kanke Road", lat: 23.3802, lng: 85.3354 },
      { name: "Harmu", lat: 23.3665, lng: 85.3254 },
    ],
  },
  {
    name: "Gwalior",
    state: "Madhya Pradesh",
    lat: 26.2183,
    lng: 78.1828,
    zoom: 12,
    areas: [
      { name: "City Centre", lat: 26.2082, lng: 78.1935 },
      { name: "Morar", lat: 26.2214, lng: 78.2264 },
      { name: "Thatipur", lat: 26.2276, lng: 78.2167 },
      { name: "Lashkar", lat: 26.1902, lng: 78.1769 },
      { name: "Gandhi Nagar", lat: 26.2134, lng: 78.1754 },
    ],
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    lat: 27.1767,
    lng: 78.0081,
    zoom: 12,
    areas: [
      { name: "Sikandra", lat: 27.2165, lng: 77.9525 },
      { name: "Kamla Nagar", lat: 27.2076, lng: 78.0091 },
      { name: "Civil Lines", lat: 27.1954, lng: 78.0089 },
      { name: "Dayal Bagh", lat: 27.2354, lng: 77.9965 },
      { name: "Shahganj", lat: 27.1608, lng: 77.9914 },
    ],
  },
  {
    name: "Allahabad (Prayagraj)",
    state: "Uttar Pradesh",
    lat: 25.4358,
    lng: 81.8463,
    zoom: 12,
    areas: [
      { name: "Civil Lines", lat: 25.4534, lng: 81.8356 },
      { name: "Katra", lat: 25.4495, lng: 81.8526 },
      { name: "Naini", lat: 25.4058, lng: 81.8619 },
      { name: "Sulem Sarai", lat: 25.4152, lng: 81.8154 },
      { name: "Dhoomanganj", lat: 25.4349, lng: 81.8836 },
    ],
  },
  {
    name: "Meerut",
    state: "Uttar Pradesh",
    lat: 28.9845,
    lng: 77.7064,
    zoom: 12,
    areas: [
      { name: "Shastri Nagar", lat: 28.9916, lng: 77.7034 },
      { name: "Jagrati Vihar", lat: 28.9789, lng: 77.7246 },
      { name: "Defence Colony", lat: 28.9677, lng: 77.7045 },
      { name: "Modipuram", lat: 29.0348, lng: 77.7023 },
      { name: "Ganga Nagar", lat: 29.0005, lng: 77.7206 },
    ],
  },
  {
    name: "Faridabad",
    state: "Haryana",
    lat: 28.4089,
    lng: 77.3178,
    zoom: 12,
    areas: [
      { name: "Sector 15", lat: 28.3998, lng: 77.3125 },
      { name: "Sector 21", lat: 28.4218, lng: 77.3112 },
      { name: "Ballabhgarh", lat: 28.3458, lng: 77.3206 },
      { name: "Greenfield", lat: 28.3786, lng: 77.3187 },
      { name: "Old Faridabad", lat: 28.3953, lng: 77.3079 },
    ],
  },
  {
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    lat: 28.6692,
    lng: 77.4538,
    zoom: 12,
    areas: [
      { name: "Indirapuram", lat: 28.6469, lng: 77.3626 },
      { name: "Raj Nagar", lat: 28.6898, lng: 77.4289 },
      { name: "Kavi Nagar", lat: 28.6741, lng: 77.4375 },
      { name: "Vaishali", lat: 28.6516, lng: 77.339 },
      { name: "Sahibabad", lat: 28.6789, lng: 77.3596 },
    ],
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    lat: 28.5355,
    lng: 77.391,
    zoom: 12,
    areas: [
      { name: "Sector 18", lat: 28.5699, lng: 77.3221 },
      { name: "Sector 62", lat: 28.6193, lng: 77.3644 },
      { name: "Sector 137", lat: 28.502, lng: 77.4106 },
      { name: "Greater Noida", lat: 28.4744, lng: 77.504 },
      { name: "Sector 50", lat: 28.5703, lng: 77.3639 },
    ],
  },
  {
    name: "Gurgaon",
    state: "Haryana",
    lat: 28.4595,
    lng: 77.0266,
    zoom: 12,
    areas: [
      { name: "DLF Phase 2", lat: 28.4809, lng: 77.0891 },
      { name: "Sector 29", lat: 28.4671, lng: 77.0621 },
      { name: "Sohna Road", lat: 28.4275, lng: 77.0444 },
      { name: "MG Road", lat: 28.4806, lng: 77.0788 },
      { name: "Cyber Hub", lat: 28.4959, lng: 77.0888 },
    ],
  },
  {
    name: "Srinagar",
    state: "Jammu & Kashmir",
    lat: 34.0837,
    lng: 74.7973,
    zoom: 12,
    areas: [
      { name: "Lal Chowk", lat: 34.0701, lng: 74.8079 },
      { name: "Rajbagh", lat: 34.0783, lng: 74.8249 },
      { name: "Bemina", lat: 34.0778, lng: 74.772 },
      { name: "Soura", lat: 34.1351, lng: 74.8142 },
      { name: "Habak", lat: 34.1209, lng: 74.823 },
    ],
  },
  {
    name: "Mangalore",
    state: "Karnataka",
    lat: 12.9141,
    lng: 74.856,
    zoom: 12,
    areas: [
      { name: "Hampankatta", lat: 12.8715, lng: 74.8433 },
      { name: "Bejai", lat: 12.8943, lng: 74.852 },
      { name: "Kadri", lat: 12.8936, lng: 74.8604 },
      { name: "Derebail", lat: 12.9006, lng: 74.8624 },
      { name: "Kottara", lat: 12.8853, lng: 74.8835 },
    ],
  },
  {
    name: "Tiruchirappalli",
    state: "Tamil Nadu",
    lat: 10.7905,
    lng: 78.7047,
    zoom: 12,
    areas: [
      { name: "Srirangam", lat: 10.8551, lng: 78.6966 },
      { name: "Thillai Nagar", lat: 10.8078, lng: 78.694 },
      { name: "K K Nagar", lat: 10.7955, lng: 78.6813 },
      { name: "Woraiyur", lat: 10.822, lng: 78.6837 },
      { name: "Manikandam", lat: 10.7519, lng: 78.6644 },
    ],
  },
  {
    name: "Vijayawada",
    state: "Andhra Pradesh",
    lat: 16.5062,
    lng: 80.648,
    zoom: 12,
    areas: [
      { name: "Benz Circle", lat: 16.5001, lng: 80.6424 },
      { name: "Governorpet", lat: 16.5185, lng: 80.625 },
      { name: "Moghalrajpuram", lat: 16.5106, lng: 80.6464 },
      { name: "Gollapudi", lat: 16.5247, lng: 80.5893 },
      { name: "Labbipet", lat: 16.4998, lng: 80.655 },
    ],
  },
  {
    name: "Hubli",
    state: "Karnataka",
    lat: 15.3647,
    lng: 75.1239,
    zoom: 12,
    areas: [
      { name: "Vidyanagar", lat: 15.3563, lng: 75.139 },
      { name: "Keshwapur", lat: 15.3466, lng: 75.1088 },
      { name: "Gokul Road", lat: 15.3585, lng: 75.1087 },
      { name: "Navanagar", lat: 15.3861, lng: 75.0997 },
      { name: "Deshpande Nagar", lat: 15.3645, lng: 75.1284 },
    ],
  },
  {
    name: "Dhanbad",
    state: "Jharkhand",
    lat: 23.7957,
    lng: 86.4304,
    zoom: 12,
    areas: [
      { name: "Bank More", lat: 23.7965, lng: 86.4306 },
      { name: "Saraidhela", lat: 23.8097, lng: 86.4192 },
      { name: "Hirak Road", lat: 23.7968, lng: 86.4539 },
      { name: "Jharia", lat: 23.7413, lng: 86.4135 },
      { name: "Govindpur", lat: 23.7787, lng: 86.4997 },
    ],
  },
  {
    name: "Kota",
    state: "Rajasthan",
    lat: 25.2138,
    lng: 75.8648,
    zoom: 12,
    areas: [
      { name: "Talwandi", lat: 25.203, lng: 75.8475 },
      { name: "Rajeev Gandhi Nagar", lat: 25.1867, lng: 75.8402 },
      { name: "Mahaveer Nagar", lat: 25.1507, lng: 75.8304 },
      { name: "Dadabari", lat: 25.1645, lng: 75.8486 },
      { name: "Ladpura", lat: 25.1945, lng: 75.8902 },
    ],
  },
];

export const getCity = (name: string): City | undefined =>
  INDIAN_CITIES.find((c) => c.name === name);

export type TrafficLevel = "low" | "moderate" | "high" | "critical";
export type AQILevel = "good" | "satisfactory" | "moderate" | "poor" | "very_poor" | "severe";

export interface TrafficData {
  area: string;
  lat: number;
  lng: number;
  level: TrafficLevel;
  congestionPct: number;
  predictedNext1h: TrafficLevel;
  predictedNext2h: TrafficLevel;
  avgSpeed: number; // km/h
  peakTime: string;
}

export interface AQIData {
  area: string;
  lat: number;
  lng: number;
  aqi: number;
  level: AQILevel;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  predictedNext6h: AQILevel;
  healthAlert: string;
}

export interface WasteData {
  area: string;
  lat: number;
  lng: number;
  wasteLevel: number; // 0–100
  collectionStatus: "pending" | "scheduled" | "completed";
  nextCollection: string;
  wasteType: string[];
  tonnesPerDay: number;
}

export interface Alert {
  id: string;
  type: "traffic" | "pollution" | "waste" | "weather";
  severity: "info" | "warning" | "critical";
  area: string;
  message: string;
  time: string;
  icon: string;
}

// ─── Seeded Random (deterministic per city+area) ───────────────────────────
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return function () {
    h = (Math.imul(1664525, h) + 1013904223) | 0;
    return (h >>> 0) / 0xffffffff;
  };
}

const TRAFFIC_LEVELS: TrafficLevel[] = ["low", "moderate", "high", "critical"];
const AQI_LEVELS: AQILevel[] = ["good", "satisfactory", "moderate", "poor", "very_poor", "severe"];

function pickLevel<T>(arr: T[], r: number): T {
  return arr[Math.floor(r * arr.length)];
}

export function generateTrafficData(city: City): TrafficData[] {
  return city.areas.map((area) => {
    const rng = seededRandom(city.name + area.name + "traffic");
    const congestion = Math.floor(rng() * 90) + 10;
    const levelIdx = congestion < 30 ? 0 : congestion < 55 ? 1 : congestion < 75 ? 2 : 3;
    const level = TRAFFIC_LEVELS[levelIdx];
    const nextIdx1 = Math.min(3, levelIdx + (rng() > 0.5 ? 1 : 0));
    const nextIdx2 = Math.min(3, nextIdx1 + (rng() > 0.5 ? 1 : 0));
    const speeds = [55, 38, 22, 12];
    const hours = ["6–8 AM", "8–10 AM", "5–7 PM", "6–8 PM", "9–11 AM"];
    return {
      area: area.name,
      lat: area.lat,
      lng: area.lng,
      level,
      congestionPct: congestion,
      predictedNext1h: TRAFFIC_LEVELS[nextIdx1],
      predictedNext2h: TRAFFIC_LEVELS[nextIdx2],
      avgSpeed: speeds[levelIdx] + Math.floor(rng() * 8) - 4,
      peakTime: hours[Math.floor(rng() * hours.length)],
    };
  });
}

export function generateAQIData(city: City): AQIData[] {
  return city.areas.map((area) => {
    const rng = seededRandom(city.name + area.name + "aqi");
    const aqi = Math.floor(rng() * 320) + 30;
    const levelIdx =
      aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 200 ? 2 : aqi < 300 ? 3 : aqi < 400 ? 4 : 5;
    const alerts = [
      "Air quality is good. Enjoy outdoor activities.",
      "Acceptable air quality for most individuals.",
      "Sensitive groups should reduce outdoor exposure.",
      "Everyone should reduce prolonged outdoor exertion.",
      "Avoid outdoor activities. Wear N95 mask.",
      "Health emergency! Stay indoors, seal windows.",
    ];
    return {
      area: area.name,
      lat: area.lat,
      lng: area.lng,
      aqi,
      level: AQI_LEVELS[levelIdx],
      pm25: Math.floor(rng() * 150) + 10,
      pm10: Math.floor(rng() * 200) + 20,
      no2: Math.floor(rng() * 80) + 5,
      o3: Math.floor(rng() * 120) + 10,
      predictedNext6h: pickLevel(AQI_LEVELS, rng()),
      healthAlert: alerts[levelIdx],
    };
  });
}

export function generateWasteData(city: City): WasteData[] {
  const statuses: WasteData["collectionStatus"][] = ["pending", "scheduled", "completed"];
  const collections = ["Today 3 PM", "Tomorrow 8 AM", "Today 6 PM", "Yesterday (Done)", "Tomorrow 2 PM"];
  const types = [
    ["Organic", "Recyclable"],
    ["Construction", "Organic"],
    ["Hazardous", "Recyclable"],
    ["Organic", "E-waste"],
    ["Recyclable", "Organic"],
  ];
  return city.areas.map((area, i) => {
    const rng = seededRandom(city.name + area.name + "waste");
    const wasteLevel = Math.floor(rng() * 90) + 10;
    return {
      area: area.name,
      lat: area.lat,
      lng: area.lng,
      wasteLevel,
      collectionStatus: statuses[Math.floor(rng() * 3)],
      nextCollection: collections[i % collections.length],
      wasteType: types[i % types.length],
      tonnesPerDay: parseFloat((rng() * 8 + 1).toFixed(1)),
    };
  });
}

export function generateAlerts(city: City): Alert[] {
  const trafficData = generateTrafficData(city);
  const aqiData = generateAQIData(city);
  const wasteData = generateWasteData(city);
  const alerts: Alert[] = [];

  trafficData.forEach((t) => {
    if (t.level === "critical" || t.level === "high") {
      alerts.push({
        id: `traffic-${t.area}`,
        type: "traffic",
        severity: t.level === "critical" ? "critical" : "warning",
        area: t.area,
        message: `Heavy congestion in ${t.area}. Avg speed ${t.avgSpeed} km/h. Peak: ${t.peakTime}.`,
        time: "Just now",
        icon: "🚦",
      });
    }
  });

  aqiData.forEach((a) => {
    if (a.aqi > 150) {
      alerts.push({
        id: `aqi-${a.area}`,
        type: "pollution",
        severity: a.aqi > 250 ? "critical" : "warning",
        area: a.area,
        message: `AQI ${a.aqi} in ${a.area}. ${a.healthAlert}`,
        time: "5 min ago",
        icon: "😷",
      });
    }
  });

  wasteData.forEach((w) => {
    if (w.wasteLevel > 75 && w.collectionStatus === "pending") {
      alerts.push({
        id: `waste-${w.area}`,
        type: "waste",
        severity: "warning",
        area: w.area,
        message: `Waste bins ${w.wasteLevel}% full in ${w.area}. Collection ${w.nextCollection}.`,
        time: "15 min ago",
        icon: "🗑️",
      });
    }
  });

  return alerts;
}

export function getAQIColor(level: AQILevel): string {
  const map: Record<AQILevel, string> = {
    good: "#22c55e",
    satisfactory: "#84cc16",
    moderate: "#eab308",
    poor: "#f97316",
    very_poor: "#ef4444",
    severe: "#7c3aed",
  };
  return map[level];
}

export function getTrafficColor(level: TrafficLevel): string {
  const map: Record<TrafficLevel, string> = {
    low: "#22c55e",
    moderate: "#eab308",
    high: "#f97316",
    critical: "#ef4444",
  };
  return map[level];
}

export function getAQIBadge(level: AQILevel): string {
  const map: Record<AQILevel, string> = {
    good: "Good",
    satisfactory: "Satisfactory",
    moderate: "Moderate",
    poor: "Poor",
    very_poor: "Very Poor",
    severe: "Severe",
  };
  return map[level];
}

export function getTrafficBadge(level: TrafficLevel): string {
  const map: Record<TrafficLevel, string> = {
    low: "Low",
    moderate: "Moderate",
    high: "High",
    critical: "Critical",
  };
  return map[level];
}
