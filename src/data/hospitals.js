// ─── TOP 50 HOSPITALS: 35 INDIA + 15 DEHRADUN ────────────────────────────────
// All images: verified Unsplash IDs (no random) — stable permanent URLs

export const HOSPITALS = [

  // ══════════════════════════════════════════════════════════════════════════
  //  INDIA TOP 35
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "1",
    name: "Medanta – The Medicity, Gurugram",
    address: "Sector 38, Gurugram, Haryana",
    city: "Gurugram", state: "Haryana", pincode: "122001",
    phone: "+91-124-4141414", website: "https://www.medanta.org",
    type: "Specialty", rating: 4.9, review_count: 6340, clarity_score: 97,
    er_available: true, er_wait_minutes: 12,
    image_url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Orthopaedics","Neurosurgery","Gastroenterology","Liver Transplant","Robotics","Oncology","Urology"],
    insurance_accepted: ["CGHS","PMJAY","Bajaj Allianz","Star Health","Aditya Birla Health","HDFC Ergo"],
    treatments: [
      { name:"Liver Transplant",surgeon_fee:400000,facility_fee:700000,anesthesia:100000,post_op:200000,total:1400000,insurance_rate:1100000,out_of_pocket:300000 },
      { name:"Cardiac Bypass",surgeon_fee:250000,facility_fee:350000,anesthesia:75000,post_op:125000,total:800000,insurance_rate:650000,out_of_pocket:150000 },
      { name:"Knee Replacement",surgeon_fee:95000,facility_fee:175000,anesthesia:35000,post_op:55000,total:360000,insurance_rate:288000,out_of_pocket:72000 },
      { name:"Robotic Surgery",surgeon_fee:320000,facility_fee:480000,anesthesia:110000,post_op:160000,total:1070000,insurance_rate:856000,out_of_pocket:214000 },
      { name:"Angioplasty",surgeon_fee:90000,facility_fee:130000,anesthesia:25000,post_op:55000,total:300000,insurance_rate:240000,out_of_pocket:60000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:45000,anesthesia:0,post_op:15000,total:60000,insurance_rate:48000,out_of_pocket:12000 },
      { name:"Hip Replacement",surgeon_fee:85000,facility_fee:155000,anesthesia:32000,post_op:48000,total:320000,insurance_rate:256000,out_of_pocket:64000 },
      { name:"Kidney Transplant",surgeon_fee:350000,facility_fee:550000,anesthesia:90000,post_op:180000,total:1170000,insurance_rate:936000,out_of_pocket:234000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8000,anesthesia:0,post_op:0,total:8000,insurance_rate:6000,out_of_pocket:2000 },
      { name:"Spine Surgery (Lumbar Fusion)",surgeon_fee:110000,facility_fee:170000,anesthesia:38000,post_op:52000,total:370000,insurance_rate:295000,out_of_pocket:75000 },
    ],
    latitude: 28.4595, longitude: 77.0266, verified: true, emergency_line: "1800-11-0101", tier: "india"
  },
  {
    id: "2",
    name: "AIIMS New Delhi",
    address: "Ansari Nagar, New Delhi – 110029",
    city: "New Delhi", state: "Delhi", pincode: "110029",
    phone: "+91-11-26588500", website: "https://www.aiims.edu",
    type: "Teaching", rating: 4.7, review_count: 9200, clarity_score: 95,
    er_available: true, er_wait_minutes: 25,
    image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
    specialties: ["All Medical Specialties","Research","Trauma","Oncology","Cardiology","Neurosurgery","Transplant","Psychiatry"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Rashtriya Swasthya Bima Yojana"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:3500,anesthesia:0,post_op:0,total:3500,insurance_rate:2500,out_of_pocket:1000 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:2200,anesthesia:0,post_op:0,total:2200,insurance_rate:1800,out_of_pocket:400 },
      { name:"Angioplasty",surgeon_fee:80000,facility_fee:120000,anesthesia:25000,post_op:45000,total:270000,insurance_rate:220000,out_of_pocket:50000 },
      { name:"Knee Replacement",surgeon_fee:75000,facility_fee:150000,anesthesia:30000,post_op:45000,total:300000,insurance_rate:240000,out_of_pocket:60000 },
      { name:"Liver Transplant",surgeon_fee:350000,facility_fee:600000,anesthesia:90000,post_op:160000,total:1200000,insurance_rate:960000,out_of_pocket:240000 },
      { name:"Kidney Transplant",surgeon_fee:300000,facility_fee:500000,anesthesia:80000,post_op:150000,total:1030000,insurance_rate:824000,out_of_pocket:206000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:35000,anesthesia:0,post_op:10000,total:45000,insurance_rate:36000,out_of_pocket:9000 },
      { name:"Cataract Surgery",surgeon_fee:15000,facility_fee:20000,anesthesia:3000,post_op:5000,total:43000,insurance_rate:34000,out_of_pocket:9000 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2800,anesthesia:0,post_op:0,total:2800,insurance_rate:2200,out_of_pocket:600 },
      { name:"Appendectomy",surgeon_fee:30000,facility_fee:45000,anesthesia:12000,post_op:18000,total:105000,insurance_rate:84000,out_of_pocket:21000 },
    ],
    latitude: 28.5672, longitude: 77.2100, verified: true, emergency_line: "011-26588700", tier: "india"
  },
  {
    id: "3",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    address: "Andheri West, Mumbai – 400053",
    city: "Mumbai", state: "Maharashtra", pincode: "400053",
    phone: "+91-22-42696969", website: "https://www.kokilabenhospital.com",
    type: "Specialty", rating: 4.8, review_count: 4700, clarity_score: 94,
    er_available: true, er_wait_minutes: 14,
    image_url: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&auto=format&fit=crop&q=80",
    specialties: ["Robotic Surgery","Oncology","Neurology","Cardiology","Orthopaedics","Gynaecology","Urology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","Aditya Birla Health","Tata AIG"],
    treatments: [
      { name:"C-Section",surgeon_fee:60000,facility_fee:90000,anesthesia:20000,post_op:30000,total:200000,insurance_rate:160000,out_of_pocket:40000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:12000,anesthesia:0,post_op:0,total:12000,insurance_rate:9000,out_of_pocket:3000 },
      { name:"Robotic Surgery",surgeon_fee:300000,facility_fee:450000,anesthesia:100000,post_op:150000,total:1000000,insurance_rate:800000,out_of_pocket:200000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:55000,anesthesia:0,post_op:18000,total:73000,insurance_rate:58000,out_of_pocket:15000 },
      { name:"Angioplasty",surgeon_fee:95000,facility_fee:145000,anesthesia:30000,post_op:55000,total:325000,insurance_rate:260000,out_of_pocket:65000 },
      { name:"Knee Replacement",surgeon_fee:90000,facility_fee:170000,anesthesia:34000,post_op:52000,total:346000,insurance_rate:276800,out_of_pocket:69200 },
      { name:"Laparoscopy",surgeon_fee:40000,facility_fee:60000,anesthesia:15000,post_op:20000,total:135000,insurance_rate:108000,out_of_pocket:27000 },
      { name:"Kidney Transplant",surgeon_fee:320000,facility_fee:520000,anesthesia:85000,post_op:165000,total:1090000,insurance_rate:872000,out_of_pocket:218000 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:4500,anesthesia:0,post_op:0,total:4500,insurance_rate:3600,out_of_pocket:900 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:3200,anesthesia:0,post_op:0,total:3200,insurance_rate:2560,out_of_pocket:640 },
    ],
    latitude: 19.1197, longitude: 72.8464, verified: true, emergency_line: "022-42696969", tier: "india"
  },
  {
    id: "4",
    name: "Apollo Hospitals Chennai",
    address: "Greams Road, Chennai – 600006",
    city: "Chennai", state: "Tamil Nadu", pincode: "600006",
    phone: "+91-44-28293333", website: "https://www.apollohospitals.com",
    type: "Specialty", rating: 4.8, review_count: 5210, clarity_score: 92,
    er_available: true, er_wait_minutes: 18,
    image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Organ Transplant","Oncology","Neurology","Orthopaedics","Endocrinology"],
    insurance_accepted: ["Apollo Munich","Star Health","HDFC Ergo","Bajaj Allianz","CGHS","Niva Bupa"],
    treatments: [
      { name:"Knee Replacement",surgeon_fee:85000,facility_fee:165000,anesthesia:35000,post_op:45000,total:330000,insurance_rate:264000,out_of_pocket:66000 },
      { name:"Angioplasty",surgeon_fee:90000,facility_fee:130000,anesthesia:30000,post_op:50000,total:300000,insurance_rate:240000,out_of_pocket:60000 },
      { name:"Cataract Surgery",surgeon_fee:25000,facility_fee:35000,anesthesia:5000,post_op:10000,total:75000,insurance_rate:60000,out_of_pocket:15000 },
      { name:"Liver Transplant",surgeon_fee:380000,facility_fee:660000,anesthesia:95000,post_op:185000,total:1320000,insurance_rate:1056000,out_of_pocket:264000 },
      { name:"Hip Replacement",surgeon_fee:82000,facility_fee:148000,anesthesia:30000,post_op:46000,total:306000,insurance_rate:244800,out_of_pocket:61200 },
      { name:"Cardiac Bypass",surgeon_fee:240000,facility_fee:340000,anesthesia:72000,post_op:118000,total:770000,insurance_rate:616000,out_of_pocket:154000 },
      { name:"Spine Surgery (Lumbar Fusion)",surgeon_fee:115000,facility_fee:175000,anesthesia:40000,post_op:56000,total:386000,insurance_rate:308800,out_of_pocket:77200 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:50000,anesthesia:0,post_op:16000,total:66000,insurance_rate:52800,out_of_pocket:13200 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:3000,anesthesia:0,post_op:0,total:3000,insurance_rate:2400,out_of_pocket:600 },
      { name:"Kidney Transplant",surgeon_fee:310000,facility_fee:510000,anesthesia:82000,post_op:158000,total:1060000,insurance_rate:848000,out_of_pocket:212000 },
    ],
    latitude: 13.0602, longitude: 80.2496, verified: true, emergency_line: "044-28293333", tier: "india"
  },
  {
    id: "5",
    name: "Manipal Hospital Bangalore",
    address: "HAL Airport Road, Bengaluru – 560017",
    city: "Bengaluru", state: "Karnataka", pincode: "560017",
    phone: "+91-80-25023456", website: "https://www.manipalhospitals.com",
    type: "Specialty", rating: 4.7, review_count: 4120, clarity_score: 91,
    er_available: true, er_wait_minutes: 15,
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    specialties: ["Oncology","Cardiology","Neurosciences","Orthopaedics","Transplant","Pulmonology"],
    insurance_accepted: ["Star Health","Bajaj Allianz","HDFC Ergo","Aditya Birla Health","United India"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:9000,anesthesia:0,post_op:0,total:9000,insurance_rate:7200,out_of_pocket:1800 },
      { name:"Spine Surgery (Lumbar Fusion)",surgeon_fee:130000,facility_fee:190000,anesthesia:42000,post_op:58000,total:420000,insurance_rate:336000,out_of_pocket:84000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:48000,anesthesia:0,post_op:15000,total:63000,insurance_rate:50400,out_of_pocket:12600 },
      { name:"Cardiac Bypass",surgeon_fee:235000,facility_fee:335000,anesthesia:71000,post_op:119000,total:760000,insurance_rate:608000,out_of_pocket:152000 },
      { name:"Knee Replacement",surgeon_fee:88000,facility_fee:162000,anesthesia:33000,post_op:49000,total:332000,insurance_rate:265600,out_of_pocket:66400 },
      { name:"Kidney Transplant",surgeon_fee:330000,facility_fee:530000,anesthesia:88000,post_op:172000,total:1120000,insurance_rate:896000,out_of_pocket:224000 },
      { name:"Laparoscopy",surgeon_fee:38000,facility_fee:58000,anesthesia:14000,post_op:19000,total:129000,insurance_rate:103200,out_of_pocket:25800 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3800,anesthesia:0,post_op:0,total:3800,insurance_rate:3040,out_of_pocket:760 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2900,anesthesia:0,post_op:0,total:2900,insurance_rate:2320,out_of_pocket:580 },
      { name:"Appendectomy",surgeon_fee:35000,facility_fee:52000,anesthesia:13000,post_op:20000,total:120000,insurance_rate:96000,out_of_pocket:24000 },
    ],
    latitude: 12.9716, longitude: 77.6412, verified: true, emergency_line: "080-25023456", tier: "india"
  },
  {
    id: "6",
    name: "Fortis Memorial Research Institute",
    address: "Sector 44, Gurugram, Haryana – 122002",
    city: "Gurugram", state: "Haryana", pincode: "122002",
    phone: "+91-124-4921021", website: "https://www.fortishealthcare.com",
    type: "Specialty", rating: 4.7, review_count: 3980, clarity_score: 93,
    er_available: true, er_wait_minutes: 16,
    image_url: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Neurology","Oncology","Bone Marrow Transplant","Robotic Surgery","Urology"],
    insurance_accepted: ["CGHS","Star Health","Bajaj Allianz","HDFC Ergo","Max Bupa","Tata AIG"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:245000,facility_fee:345000,anesthesia:73000,post_op:122000,total:785000,insurance_rate:628000,out_of_pocket:157000 },
      { name:"Bone Marrow Transplant",surgeon_fee:500000,facility_fee:900000,anesthesia:150000,post_op:250000,total:1800000,insurance_rate:1440000,out_of_pocket:360000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:9500,anesthesia:0,post_op:0,total:9500,insurance_rate:7600,out_of_pocket:1900 },
      { name:"Robotic Surgery",surgeon_fee:310000,facility_fee:460000,anesthesia:105000,post_op:155000,total:1030000,insurance_rate:824000,out_of_pocket:206000 },
      { name:"Kidney Transplant",surgeon_fee:340000,facility_fee:540000,anesthesia:90000,post_op:175000,total:1145000,insurance_rate:916000,out_of_pocket:229000 },
      { name:"Angioplasty",surgeon_fee:88000,facility_fee:128000,anesthesia:27000,post_op:52000,total:295000,insurance_rate:236000,out_of_pocket:59000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:52000,anesthesia:0,post_op:18000,total:70000,insurance_rate:56000,out_of_pocket:14000 },
      { name:"Knee Replacement",surgeon_fee:92000,facility_fee:172000,anesthesia:36000,post_op:52000,total:352000,insurance_rate:281600,out_of_pocket:70400 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:4200,anesthesia:0,post_op:0,total:4200,insurance_rate:3360,out_of_pocket:840 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:3100,anesthesia:0,post_op:0,total:3100,insurance_rate:2480,out_of_pocket:620 },
    ],
    latitude: 28.4595, longitude: 77.0622, verified: true, emergency_line: "124-4921021", tier: "india"
  },
  {
    id: "7",
    name: "Tata Memorial Hospital Mumbai",
    address: "Dr E Borges Road, Parel, Mumbai – 400012",
    city: "Mumbai", state: "Maharashtra", pincode: "400012",
    phone: "+91-22-24177000", website: "https://tmc.gov.in",
    type: "Government", rating: 4.6, review_count: 7100, clarity_score: 89,
    er_available: true, er_wait_minutes: 30,
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    specialties: ["Oncology","Radiation Therapy","Haematology","Surgical Oncology","Paediatric Oncology"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Star Health","National Insurance"],
    treatments: [
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:30000,anesthesia:0,post_op:10000,total:40000,insurance_rate:32000,out_of_pocket:8000 },
      { name:"Bone Marrow Transplant",surgeon_fee:450000,facility_fee:800000,anesthesia:140000,post_op:220000,total:1610000,insurance_rate:1288000,out_of_pocket:322000 },
      { name:"Robotic Surgery",surgeon_fee:280000,facility_fee:420000,anesthesia:95000,post_op:145000,total:940000,insurance_rate:752000,out_of_pocket:188000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5500,anesthesia:0,post_op:0,total:5500,insurance_rate:4400,out_of_pocket:1100 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3000,anesthesia:0,post_op:0,total:3000,insurance_rate:2400,out_of_pocket:600 },
      { name:"Laparoscopy",surgeon_fee:35000,facility_fee:55000,anesthesia:13000,post_op:17000,total:120000,insurance_rate:96000,out_of_pocket:24000 },
    ],
    latitude: 19.0044, longitude: 72.8411, verified: true, emergency_line: "022-24177000", tier: "india"
  },
  {
    id: "8",
    name: "Christian Medical College (CMC) Vellore",
    address: "Ida Scudder Road, Vellore, Tamil Nadu – 632004",
    city: "Vellore", state: "Tamil Nadu", pincode: "632004",
    phone: "+91-416-2281000", website: "https://www.cmch-vellore.edu",
    type: "Teaching", rating: 4.9, review_count: 8900, clarity_score: 96,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop&q=80",
    specialties: ["All Medical Specialties","Neurology","Cardiology","Transplant","Paediatrics","Infectious Disease"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","United India","Oriental Insurance"],
    treatments: [
      { name:"Kidney Transplant",surgeon_fee:280000,facility_fee:480000,anesthesia:78000,post_op:145000,total:983000,insurance_rate:786400,out_of_pocket:196600 },
      { name:"Liver Transplant",surgeon_fee:370000,facility_fee:640000,anesthesia:92000,post_op:178000,total:1280000,insurance_rate:1024000,out_of_pocket:256000 },
      { name:"Cardiac Bypass",surgeon_fee:220000,facility_fee:320000,anesthesia:68000,post_op:112000,total:720000,insurance_rate:576000,out_of_pocket:144000 },
      { name:"Knee Replacement",surgeon_fee:80000,facility_fee:155000,anesthesia:31000,post_op:47000,total:313000,insurance_rate:250400,out_of_pocket:62600 },
      { name:"Cataract Surgery",surgeon_fee:18000,facility_fee:27000,anesthesia:4000,post_op:6000,total:55000,insurance_rate:44000,out_of_pocket:11000 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2600,anesthesia:0,post_op:0,total:2600,insurance_rate:2080,out_of_pocket:520 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5000,anesthesia:0,post_op:0,total:5000,insurance_rate:4000,out_of_pocket:1000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:38000,anesthesia:0,post_op:12000,total:50000,insurance_rate:40000,out_of_pocket:10000 },
    ],
    latitude: 12.9237, longitude: 79.1326, verified: true, emergency_line: "416-2281000", tier: "india"
  },
  {
    id: "9",
    name: "PGIMER Chandigarh",
    address: "Sector 12, Chandigarh – 160012",
    city: "Chandigarh", state: "Punjab", pincode: "160012",
    phone: "+91-172-2755555", website: "https://pgimer.edu.in",
    type: "Teaching", rating: 4.7, review_count: 6800, clarity_score: 90,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurosurgery","Transplant","Oncology","Haematology","Paediatrics"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Star Health","New India Assurance"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:200000,facility_fee:300000,anesthesia:65000,post_op:105000,total:670000,insurance_rate:536000,out_of_pocket:134000 },
      { name:"Kidney Transplant",surgeon_fee:260000,facility_fee:460000,anesthesia:75000,post_op:135000,total:930000,insurance_rate:744000,out_of_pocket:186000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4200,anesthesia:0,post_op:0,total:4200,insurance_rate:3360,out_of_pocket:840 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:32000,anesthesia:0,post_op:9000,total:41000,insurance_rate:32800,out_of_pocket:8200 },
      { name:"Angioplasty",surgeon_fee:78000,facility_fee:118000,anesthesia:24000,post_op:44000,total:264000,insurance_rate:211200,out_of_pocket:52800 },
    ],
    latitude: 30.7433, longitude: 76.7794, verified: true, emergency_line: "172-2755565", tier: "india"
  },
  {
    id: "10",
    name: "Narayana Health City Bangalore",
    address: "Bommasandra Industrial Area, Bengaluru – 560099",
    city: "Bengaluru", state: "Karnataka", pincode: "560099",
    phone: "+91-80-71222222", website: "https://www.narayanahealth.org",
    type: "Specialty", rating: 4.6, review_count: 3540, clarity_score: 88,
    er_available: true, er_wait_minutes: 18,
    image_url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Orthopaedics","Neurosurgery","Oncology","Transplant","Urology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","CGHS","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:180000,facility_fee:270000,anesthesia:58000,post_op:92000,total:600000,insurance_rate:480000,out_of_pocket:120000 },
      { name:"Knee Replacement",surgeon_fee:72000,facility_fee:138000,anesthesia:28000,post_op:42000,total:280000,insurance_rate:224000,out_of_pocket:56000 },
      { name:"Angioplasty",surgeon_fee:82000,facility_fee:122000,anesthesia:26000,post_op:48000,total:278000,insurance_rate:222400,out_of_pocket:55600 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:38000,anesthesia:0,post_op:12000,total:50000,insurance_rate:40000,out_of_pocket:10000 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2700,anesthesia:0,post_op:0,total:2700,insurance_rate:2160,out_of_pocket:540 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7500,anesthesia:0,post_op:0,total:7500,insurance_rate:6000,out_of_pocket:1500 },
    ],
    latitude: 12.8277, longitude: 77.6908, verified: true, emergency_line: "080-71222222", tier: "india"
  },
  {
    id: "11",
    name: "Sir Ganga Ram Hospital Delhi",
    address: "Old Rajinder Nagar, New Delhi – 110060",
    city: "New Delhi", state: "Delhi", pincode: "110060",
    phone: "+91-11-25750000", website: "https://www.sgrh.com",
    type: "Specialty", rating: 4.6, review_count: 5600, clarity_score: 88,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Gastroenterology","Orthopaedics","Urology","Oncology"],
    insurance_accepted: ["CGHS","Star Health","HDFC Ergo","Bajaj Allianz","Niva Bupa"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:230000,facility_fee:330000,anesthesia:70000,post_op:115000,total:745000,insurance_rate:596000,out_of_pocket:149000 },
      { name:"Angioplasty",surgeon_fee:85000,facility_fee:125000,anesthesia:27000,post_op:50000,total:287000,insurance_rate:229600,out_of_pocket:57400 },
      { name:"Knee Replacement",surgeon_fee:88000,facility_fee:165000,anesthesia:33000,post_op:50000,total:336000,insurance_rate:268800,out_of_pocket:67200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8000,anesthesia:0,post_op:0,total:8000,insurance_rate:6400,out_of_pocket:1600 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:44000,anesthesia:0,post_op:14000,total:58000,insurance_rate:46400,out_of_pocket:11600 },
    ],
    latitude: 28.6441, longitude: 77.1815, verified: true, emergency_line: "011-25750000", tier: "india"
  },
  {
    id: "12",
    name: "Indraprastha Apollo Hospital Delhi",
    address: "Sarita Vihar, Mathura Road, New Delhi – 110076",
    city: "New Delhi", state: "Delhi", pincode: "110076",
    phone: "+91-11-71791090", website: "https://www.apollohospitals.com",
    type: "Specialty", rating: 4.7, review_count: 6200, clarity_score: 91,
    er_available: true, er_wait_minutes: 17,
    image_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Neurology","Transplant","Oncology","Orthopaedics","Robotic Surgery"],
    insurance_accepted: ["Apollo Munich","CGHS","Star Health","HDFC Ergo","Bajaj Allianz","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:245000,facility_fee:345000,anesthesia:74000,post_op:120000,total:784000,insurance_rate:627200,out_of_pocket:156800 },
      { name:"Liver Transplant",surgeon_fee:395000,facility_fee:680000,anesthesia:98000,post_op:192000,total:1365000,insurance_rate:1092000,out_of_pocket:273000 },
      { name:"Robotic Surgery",surgeon_fee:295000,facility_fee:445000,anesthesia:102000,post_op:152000,total:994000,insurance_rate:795200,out_of_pocket:198800 },
      { name:"Angioplasty",surgeon_fee:92000,facility_fee:132000,anesthesia:28000,post_op:52000,total:304000,insurance_rate:243200,out_of_pocket:60800 },
      { name:"Knee Replacement",surgeon_fee:90000,facility_fee:168000,anesthesia:34000,post_op:52000,total:344000,insurance_rate:275200,out_of_pocket:68800 },
    ],
    latitude: 28.5323, longitude: 77.2822, verified: true, emergency_line: "011-71791090", tier: "india"
  },
  {
    id: "13",
    name: "BLK-Max Super Speciality Hospital",
    address: "Pusa Road, Rajender Nagar, New Delhi – 110005",
    city: "New Delhi", state: "Delhi", pincode: "110005",
    phone: "+91-11-30403040", website: "https://www.blkmax.com",
    type: "Specialty", rating: 4.6, review_count: 4890, clarity_score: 87,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    specialties: ["Bone Marrow Transplant","Oncology","Cardiology","Gastroenterology","Neurology","Urology"],
    insurance_accepted: ["CGHS","Star Health","HDFC Ergo","Aditya Birla Health","Tata AIG"],
    treatments: [
      { name:"Bone Marrow Transplant",surgeon_fee:480000,facility_fee:860000,anesthesia:145000,post_op:240000,total:1725000,insurance_rate:1380000,out_of_pocket:345000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:48000,anesthesia:0,post_op:15000,total:63000,insurance_rate:50400,out_of_pocket:12600 },
      { name:"Angioplasty",surgeon_fee:86000,facility_fee:126000,anesthesia:26000,post_op:48000,total:286000,insurance_rate:228800,out_of_pocket:57200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8500,anesthesia:0,post_op:0,total:8500,insurance_rate:6800,out_of_pocket:1700 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:3000,anesthesia:0,post_op:0,total:3000,insurance_rate:2400,out_of_pocket:600 },
    ],
    latitude: 28.6428, longitude: 77.1793, verified: true, emergency_line: "011-30403040", tier: "india"
  },
  {
    id: "14",
    name: "Wockhardt Hospital Mumbai Central",
    address: "1877 Dr Anandrao Nair Road, Mumbai – 400011",
    city: "Mumbai", state: "Maharashtra", pincode: "400011",
    phone: "+91-22-61784444", website: "https://www.wockhardthospitals.com",
    type: "Specialty", rating: 4.5, review_count: 3100, clarity_score: 84,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Kidney Transplant","Bariatric Surgery"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","National Insurance","United India"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:228000,facility_fee:328000,anesthesia:70000,post_op:112000,total:738000,insurance_rate:590400,out_of_pocket:147600 },
      { name:"Kidney Transplant",surgeon_fee:298000,facility_fee:498000,anesthesia:80000,post_op:148000,total:1024000,insurance_rate:819200,out_of_pocket:204800 },
      { name:"Knee Replacement",surgeon_fee:86000,facility_fee:158000,anesthesia:32000,post_op:46000,total:322000,insurance_rate:257600,out_of_pocket:64400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:11000,anesthesia:0,post_op:0,total:11000,insurance_rate:8800,out_of_pocket:2200 },
      { name:"Laparoscopy",surgeon_fee:42000,facility_fee:62000,anesthesia:16000,post_op:22000,total:142000,insurance_rate:113600,out_of_pocket:28400 },
    ],
    latitude: 18.9590, longitude: 72.8247, verified: true, emergency_line: "022-61784444", tier: "india"
  },
  {
    id: "15",
    name: "Max Super Specialty Hospital Saket",
    address: "Press Enclave Road, Saket, New Delhi – 110017",
    city: "New Delhi", state: "Delhi", pincode: "110017",
    phone: "+91-11-26515050", website: "https://www.maxhealthcare.in",
    type: "Specialty", rating: 4.6, review_count: 5400, clarity_score: 89,
    er_available: true, er_wait_minutes: 16,
    image_url: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Orthopaedics","Neurology","Oncology","Gynaecology","Urology"],
    insurance_accepted: ["Max Bupa","CGHS","Star Health","HDFC Ergo","Bajaj Allianz","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:242000,facility_fee:342000,anesthesia:73000,post_op:118000,total:775000,insurance_rate:620000,out_of_pocket:155000 },
      { name:"Knee Replacement",surgeon_fee:89000,facility_fee:164000,anesthesia:33000,post_op:51000,total:337000,insurance_rate:269600,out_of_pocket:67400 },
      { name:"Angioplasty",surgeon_fee:88000,facility_fee:128000,anesthesia:26000,post_op:50000,total:292000,insurance_rate:233600,out_of_pocket:58400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:9000,anesthesia:0,post_op:0,total:9000,insurance_rate:7200,out_of_pocket:1800 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:47000,anesthesia:0,post_op:15000,total:62000,insurance_rate:49600,out_of_pocket:12400 },
    ],
    latitude: 28.5262, longitude: 77.2188, verified: true, emergency_line: "011-26515050", tier: "india"
  },
  {
    id: "16",
    name: "Amrita Institute of Medical Sciences Kochi",
    address: "AIMS Ponekkara PO, Kochi, Kerala – 682041",
    city: "Kochi", state: "Kerala", pincode: "682041",
    phone: "+91-484-2801234", website: "https://www.amritahospitals.org",
    type: "Teaching", rating: 4.8, review_count: 4320, clarity_score: 90,
    er_available: true, er_wait_minutes: 19,
    image_url: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurosurgery","Oncology","Transplant","Orthopaedics","Nephrology"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","HDFC Ergo","Bajaj Allianz"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:215000,facility_fee:315000,anesthesia:67000,post_op:108000,total:705000,insurance_rate:564000,out_of_pocket:141000 },
      { name:"Kidney Transplant",surgeon_fee:270000,facility_fee:470000,anesthesia:76000,post_op:140000,total:956000,insurance_rate:764800,out_of_pocket:191200 },
      { name:"Angioplasty",surgeon_fee:80000,facility_fee:120000,anesthesia:25000,post_op:47000,total:272000,insurance_rate:217600,out_of_pocket:54400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7200,anesthesia:0,post_op:0,total:7200,insurance_rate:5760,out_of_pocket:1440 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:42000,anesthesia:0,post_op:13000,total:55000,insurance_rate:44000,out_of_pocket:11000 },
    ],
    latitude: 10.0064, longitude: 76.2734, verified: true, emergency_line: "484-2801234", tier: "india"
  },
  {
    id: "17",
    name: "Lilavati Hospital Mumbai",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai – 400050",
    city: "Mumbai", state: "Maharashtra", pincode: "400050",
    phone: "+91-22-26751000", website: "https://www.lilavatihospital.com",
    type: "Specialty", rating: 4.5, review_count: 3870, clarity_score: 85,
    er_available: true, er_wait_minutes: 21,
    image_url: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Urology","Gastroenterology","Oncology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Tata AIG","Bajaj Allianz","National Insurance"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:235000,facility_fee:335000,anesthesia:72000,post_op:116000,total:758000,insurance_rate:606400,out_of_pocket:151600 },
      { name:"Knee Replacement",surgeon_fee:87000,facility_fee:160000,anesthesia:32000,post_op:48000,total:327000,insurance_rate:261600,out_of_pocket:65400 },
      { name:"Angioplasty",surgeon_fee:87000,facility_fee:127000,anesthesia:27000,post_op:50000,total:291000,insurance_rate:232800,out_of_pocket:58200 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:4800,anesthesia:0,post_op:0,total:4800,insurance_rate:3840,out_of_pocket:960 },
    ],
    latitude: 19.0607, longitude: 72.8365, verified: true, emergency_line: "022-26751000", tier: "india"
  },
  {
    id: "18",
    name: "Ruby Hall Clinic Pune",
    address: "40 Sassoon Road, Pune, Maharashtra – 411001",
    city: "Pune", state: "Maharashtra", pincode: "411001",
    phone: "+91-20-26163391", website: "https://www.rubyhall.com",
    type: "Specialty", rating: 4.5, review_count: 3290, clarity_score: 83,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Oncology","Transplant","Bariatric Surgery"],
    insurance_accepted: ["Star Health","HDFC Ergo","United India","Bajaj Allianz","National Insurance"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:225000,facility_fee:325000,anesthesia:70000,post_op:112000,total:732000,insurance_rate:585600,out_of_pocket:146400 },
      { name:"Knee Replacement",surgeon_fee:83000,facility_fee:155000,anesthesia:31000,post_op:46000,total:315000,insurance_rate:252000,out_of_pocket:63000 },
      { name:"Angioplasty",surgeon_fee:83000,facility_fee:123000,anesthesia:26000,post_op:48000,total:280000,insurance_rate:224000,out_of_pocket:56000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:9000,anesthesia:0,post_op:0,total:9000,insurance_rate:7200,out_of_pocket:1800 },
    ],
    latitude: 18.5204, longitude: 73.8567, verified: true, emergency_line: "020-26163391", tier: "india"
  },
  {
    id: "19",
    name: "KIMS Hospital Hyderabad",
    address: "#1-8-31/1 Minister Road, Secunderabad, Hyderabad – 500003",
    city: "Hyderabad", state: "Telangana", pincode: "500003",
    phone: "+91-40-44885000", website: "https://www.kimshospitals.com",
    type: "Specialty", rating: 4.5, review_count: 4100, clarity_score: 84,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Oncology","Urology","Gastroenterology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","CGHS","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:220000,facility_fee:320000,anesthesia:68000,post_op:110000,total:718000,insurance_rate:574400,out_of_pocket:143600 },
      { name:"Knee Replacement",surgeon_fee:81000,facility_fee:152000,anesthesia:30000,post_op:45000,total:308000,insurance_rate:246400,out_of_pocket:61600 },
      { name:"Angioplasty",surgeon_fee:84000,facility_fee:124000,anesthesia:26000,post_op:47000,total:281000,insurance_rate:224800,out_of_pocket:56200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8200,anesthesia:0,post_op:0,total:8200,insurance_rate:6560,out_of_pocket:1640 },
    ],
    latitude: 17.4399, longitude: 78.4983, verified: true, emergency_line: "040-44885000", tier: "india"
  },
  {
    id: "20",
    name: "Hinduja Hospital Mumbai",
    address: "Veer Savarkar Marg, Mahim, Mumbai – 400016",
    city: "Mumbai", state: "Maharashtra", pincode: "400016",
    phone: "+91-22-24447000", website: "https://www.hindujahospital.com",
    type: "Specialty", rating: 4.5, review_count: 3600, clarity_score: 85,
    er_available: true, er_wait_minutes: 19,
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Transplant","Oncology","Gastroenterology","Urology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","Tata AIG","United India"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:232000,facility_fee:332000,anesthesia:71000,post_op:114000,total:749000,insurance_rate:599200,out_of_pocket:149800 },
      { name:"Kidney Transplant",surgeon_fee:308000,facility_fee:508000,anesthesia:82000,post_op:155000,total:1053000,insurance_rate:842400,out_of_pocket:210600 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:11500,anesthesia:0,post_op:0,total:11500,insurance_rate:9200,out_of_pocket:2300 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:52000,anesthesia:0,post_op:17000,total:69000,insurance_rate:55200,out_of_pocket:13800 },
    ],
    latitude: 19.0437, longitude: 72.8399, verified: true, emergency_line: "022-24447000", tier: "india"
  },
  {
    id: "21",
    name: "Jaslok Hospital Mumbai",
    address: "15 Dr G Deshmukh Marg, Pedder Road, Mumbai – 400026",
    city: "Mumbai", state: "Maharashtra", pincode: "400026",
    phone: "+91-22-66573333", website: "https://www.jaslokhospital.net",
    type: "Specialty", rating: 4.4, review_count: 2800, clarity_score: 82,
    er_available: true, er_wait_minutes: 24,
    image_url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80",
    specialties: ["Neurology","Cardiology","Orthopaedics","Oncology","Gynaecology","Nephrology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","National Insurance"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:13000,anesthesia:0,post_op:0,total:13000,insurance_rate:10400,out_of_pocket:2600 },
      { name:"Cardiac Bypass",surgeon_fee:238000,facility_fee:338000,anesthesia:72000,post_op:115000,total:763000,insurance_rate:610400,out_of_pocket:152600 },
      { name:"Angioplasty",surgeon_fee:90000,facility_fee:132000,anesthesia:28000,post_op:52000,total:302000,insurance_rate:241600,out_of_pocket:60400 },
    ],
    latitude: 18.9737, longitude: 72.8100, verified: false, emergency_line: "022-66573333", tier: "india"
  },
  {
    id: "22",
    name: "Breach Candy Hospital Mumbai",
    address: "60-A Bhulabhai Desai Road, Mumbai – 400026",
    city: "Mumbai", state: "Maharashtra", pincode: "400026",
    phone: "+91-22-23667888", website: "https://www.breachcandyhospital.org",
    type: "General", rating: 4.4, review_count: 2700, clarity_score: 80,
    er_available: true, er_wait_minutes: 25,
    image_url: "https://images.unsplash.com/photo-1560582861-45078880e48e?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Gynaecology","Paediatrics","General Surgery"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","United India"],
    treatments: [
      { name:"C-Section",surgeon_fee:65000,facility_fee:95000,anesthesia:22000,post_op:32000,total:214000,insurance_rate:171200,out_of_pocket:42800 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:14000,anesthesia:0,post_op:0,total:14000,insurance_rate:11200,out_of_pocket:2800 },
      { name:"Angioplasty",surgeon_fee:92000,facility_fee:135000,anesthesia:29000,post_op:54000,total:310000,insurance_rate:248000,out_of_pocket:62000 },
    ],
    latitude: 18.9747, longitude: 72.8080, verified: false, emergency_line: "022-23667888", tier: "india"
  },
  {
    id: "23",
    name: "Artemis Hospital Gurugram",
    address: "Sector 51, Gurugram, Haryana – 122001",
    city: "Gurugram", state: "Haryana", pincode: "122001",
    phone: "+91-124-4511111", website: "https://www.artemishospitals.com",
    type: "Specialty", rating: 4.5, review_count: 3400, clarity_score: 85,
    er_available: true, er_wait_minutes: 18,
    image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Neurology","Oncology","Orthopaedics","Transplant","Robotic Surgery"],
    insurance_accepted: ["Star Health","CGHS","HDFC Ergo","Bajaj Allianz","Niva Bupa"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:240000,facility_fee:340000,anesthesia:73000,post_op:118000,total:771000,insurance_rate:616800,out_of_pocket:154200 },
      { name:"Robotic Surgery",surgeon_fee:305000,facility_fee:455000,anesthesia:104000,post_op:152000,total:1016000,insurance_rate:812800,out_of_pocket:203200 },
      { name:"Kidney Transplant",surgeon_fee:330000,facility_fee:528000,anesthesia:88000,post_op:170000,total:1116000,insurance_rate:892800,out_of_pocket:223200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:9000,anesthesia:0,post_op:0,total:9000,insurance_rate:7200,out_of_pocket:1800 },
    ],
    latitude: 28.4244, longitude: 77.0422, verified: true, emergency_line: "124-4511111", tier: "india"
  },
  {
    id: "24",
    name: "Santokba Durlabhji Memorial Hospital Jaipur",
    address: "Bhawani Singh Road, Jaipur, Rajasthan – 302015",
    city: "Jaipur", state: "Rajasthan", pincode: "302015",
    phone: "+91-141-2566251", website: "https://www.sdmh.in",
    type: "Specialty", rating: 4.4, review_count: 2900, clarity_score: 80,
    er_available: true, er_wait_minutes: 25,
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Gastroenterology","Oncology"],
    insurance_accepted: ["Star Health","Bajaj Allianz","CGHS","PMJAY","National Insurance"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:210000,facility_fee:310000,anesthesia:65000,post_op:105000,total:690000,insurance_rate:552000,out_of_pocket:138000 },
      { name:"Angioplasty",surgeon_fee:80000,facility_fee:120000,anesthesia:25000,post_op:47000,total:272000,insurance_rate:217600,out_of_pocket:54400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7000,anesthesia:0,post_op:0,total:7000,insurance_rate:5600,out_of_pocket:1400 },
    ],
    latitude: 26.8944, longitude: 75.7961, verified: false, emergency_line: "141-2566251", tier: "india"
  },
  {
    id: "25",
    name: "Columbia Asia Hospital Bangalore",
    address: "26/4 Brigade Gateway, Malleshwaram, Bengaluru – 560055",
    city: "Bengaluru", state: "Karnataka", pincode: "560055",
    phone: "+91-80-61222222", website: "https://www.columbiaasia.com",
    type: "Specialty", rating: 4.4, review_count: 2860, clarity_score: 81,
    er_available: true, er_wait_minutes: 21,
    image_url: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Orthopaedics","General Surgery","Gynaecology","Paediatrics"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","United India"],
    treatments: [
      { name:"Knee Replacement",surgeon_fee:80000,facility_fee:150000,anesthesia:30000,post_op:45000,total:305000,insurance_rate:244000,out_of_pocket:61000 },
      { name:"C-Section",surgeon_fee:55000,facility_fee:82000,anesthesia:18000,post_op:27000,total:182000,insurance_rate:145600,out_of_pocket:36400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8500,anesthesia:0,post_op:0,total:8500,insurance_rate:6800,out_of_pocket:1700 },
    ],
    latitude: 13.0067, longitude: 77.5713, verified: false, emergency_line: "080-61222222", tier: "india"
  },
  {
    id: "26",
    name: "Medica Superspecialty Hospital Kolkata",
    address: "127 Mukundapur, Eastern Metropolitan Bypass, Kolkata – 700099",
    city: "Kolkata", state: "West Bengal", pincode: "700099",
    phone: "+91-33-66520000", website: "https://www.medicahospitals.in",
    type: "Specialty", rating: 4.4, review_count: 3100, clarity_score: 80,
    er_available: true, er_wait_minutes: 24,
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Oncology","Transplant","Orthopaedics"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","CGHS","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:218000,facility_fee:318000,anesthesia:67000,post_op:108000,total:711000,insurance_rate:568800,out_of_pocket:142200 },
      { name:"Angioplasty",surgeon_fee:82000,facility_fee:122000,anesthesia:25000,post_op:46000,total:275000,insurance_rate:220000,out_of_pocket:55000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7800,anesthesia:0,post_op:0,total:7800,insurance_rate:6240,out_of_pocket:1560 },
    ],
    latitude: 22.5014, longitude: 88.3969, verified: false, emergency_line: "033-66520000", tier: "india"
  },
  {
    id: "27",
    name: "AIIMS Rishikesh",
    address: "Virbhadra Marg, Rishikesh, Uttarakhand – 249203",
    city: "Rishikesh", state: "Uttarakhand", pincode: "249203",
    phone: "+91-135-2462900", website: "https://www.aiimsrishikesh.edu.in",
    type: "Teaching", rating: 4.5, review_count: 3800, clarity_score: 82,
    er_available: true, er_wait_minutes: 26,
    image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
    specialties: ["All Medical Specialties","Trauma","Cardiology","Neurosurgery","Oncology","Transplant"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Star Health","New India Assurance"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:195000,facility_fee:295000,anesthesia:63000,post_op:98000,total:651000,insurance_rate:520800,out_of_pocket:130200 },
      { name:"Kidney Transplant",surgeon_fee:255000,facility_fee:455000,anesthesia:74000,post_op:132000,total:916000,insurance_rate:732800,out_of_pocket:183200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5000,anesthesia:0,post_op:0,total:5000,insurance_rate:4000,out_of_pocket:1000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:34000,anesthesia:0,post_op:10000,total:44000,insurance_rate:35200,out_of_pocket:8800 },
      { name:"Angioplasty",surgeon_fee:76000,facility_fee:116000,anesthesia:23000,post_op:43000,total:258000,insurance_rate:206400,out_of_pocket:51600 },
    ],
    latitude: 30.0869, longitude: 78.2676, verified: true, emergency_line: "135-2462900", tier: "india"
  },
  {
    id: "28",
    name: "Rajiv Gandhi Cancer Institute Delhi",
    address: "Sector 5, Rohini, New Delhi – 110085",
    city: "New Delhi", state: "Delhi", pincode: "110085",
    phone: "+91-11-47022222", website: "https://www.rgcirc.org",
    type: "Specialty", rating: 4.5, review_count: 3900, clarity_score: 84,
    er_available: false, er_wait_minutes: null,
    image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&auto=format&fit=crop&q=80",
    specialties: ["Oncology","Radiation Therapy","Haematology","Bone Marrow Transplant","Surgical Oncology"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","HDFC Ergo","Bajaj Allianz"],
    treatments: [
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:42000,anesthesia:0,post_op:13000,total:55000,insurance_rate:44000,out_of_pocket:11000 },
      { name:"Bone Marrow Transplant",surgeon_fee:460000,facility_fee:820000,anesthesia:142000,post_op:228000,total:1650000,insurance_rate:1320000,out_of_pocket:330000 },
      { name:"Robotic Surgery",surgeon_fee:290000,facility_fee:440000,anesthesia:98000,post_op:148000,total:976000,insurance_rate:780800,out_of_pocket:195200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8800,anesthesia:0,post_op:0,total:8800,insurance_rate:7040,out_of_pocket:1760 },
    ],
    latitude: 28.7216, longitude: 77.0832, verified: true, emergency_line: "011-47022222", tier: "india"
  },
  {
    id: "29",
    name: "Yashoda Hospitals Hyderabad",
    address: "Behind Hari Hara Kala Bhavan, Nalgonda X Roads, Malakpet, Hyderabad – 500036",
    city: "Hyderabad", state: "Telangana", pincode: "500036",
    phone: "+91-40-45674567", website: "https://www.yashodahospitals.com",
    type: "Specialty", rating: 4.4, review_count: 3200, clarity_score: 81,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Orthopaedics","Neurology","Oncology","Urology","Gastroenterology"],
    insurance_accepted: ["Star Health","Bajaj Allianz","CGHS","PMJAY","HDFC Ergo"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:215000,facility_fee:315000,anesthesia:67000,post_op:108000,total:705000,insurance_rate:564000,out_of_pocket:141000 },
      { name:"Knee Replacement",surgeon_fee:80000,facility_fee:150000,anesthesia:30000,post_op:45000,total:305000,insurance_rate:244000,out_of_pocket:61000 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7500,anesthesia:0,post_op:0,total:7500,insurance_rate:6000,out_of_pocket:1500 },
    ],
    latitude: 17.3688, longitude: 78.4878, verified: false, emergency_line: "040-45674567", tier: "india"
  },
  {
    id: "30",
    name: "Global Hospital Mumbai",
    address: "35 Dr E Borges Road, Parel, Mumbai – 400012",
    city: "Mumbai", state: "Maharashtra", pincode: "400012",
    phone: "+91-22-67676767", website: "https://www.globalhospitalsindia.com",
    type: "Specialty", rating: 4.4, review_count: 2960, clarity_score: 81,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
    specialties: ["Liver Transplant","Kidney Transplant","Cardiology","Neurology","Oncology"],
    insurance_accepted: ["Star Health","HDFC Ergo","Bajaj Allianz","Tata AIG"],
    treatments: [
      { name:"Liver Transplant",surgeon_fee:365000,facility_fee:635000,anesthesia:90000,post_op:175000,total:1265000,insurance_rate:1012000,out_of_pocket:253000 },
      { name:"Kidney Transplant",surgeon_fee:295000,facility_fee:495000,anesthesia:79000,post_op:148000,total:1017000,insurance_rate:813600,out_of_pocket:203400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:10500,anesthesia:0,post_op:0,total:10500,insurance_rate:8400,out_of_pocket:2100 },
    ],
    latitude: 19.0038, longitude: 72.8396, verified: false, emergency_line: "022-67676767", tier: "india"
  },
  {
    id: "31",
    name: "Medanta Hospital Lucknow",
    address: "Sector A, Pocket 1, Amar Shaheed Path, Lucknow – 226030",
    city: "Lucknow", state: "Uttar Pradesh", pincode: "226030",
    phone: "+91-522-4500000", website: "https://www.medanta.org",
    type: "Specialty", rating: 4.5, review_count: 3500, clarity_score: 84,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Surgery","Orthopaedics","Neurology","Oncology","Urology","Gastroenterology"],
    insurance_accepted: ["Max Bupa","Star Health","CGHS","PMJAY","Bajaj Allianz"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:225000,facility_fee:325000,anesthesia:69000,post_op:112000,total:731000,insurance_rate:584800,out_of_pocket:146200 },
      { name:"Knee Replacement",surgeon_fee:84000,facility_fee:158000,anesthesia:32000,post_op:47000,total:321000,insurance_rate:256800,out_of_pocket:64200 },
      { name:"Angioplasty",surgeon_fee:83000,facility_fee:123000,anesthesia:26000,post_op:47000,total:279000,insurance_rate:223200,out_of_pocket:55800 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:8000,anesthesia:0,post_op:0,total:8000,insurance_rate:6400,out_of_pocket:1600 },
    ],
    latitude: 26.8467, longitude: 80.9462, verified: true, emergency_line: "522-4500000", tier: "india"
  },
  {
    id: "32",
    name: "NIMHANS Bangalore",
    address: "Hosur Road, Lakkasandra, Bengaluru – 560029",
    city: "Bengaluru", state: "Karnataka", pincode: "560029",
    phone: "+91-80-46110007", website: "https://www.nimhans.ac.in",
    type: "Teaching", rating: 4.6, review_count: 4400, clarity_score: 83,
    er_available: true, er_wait_minutes: 28,
    image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80",
    specialties: ["Neurology","Neurosurgery","Psychiatry","Psychology","Neuroimaging","Epilepsy"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Star Health","United India"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5500,anesthesia:0,post_op:0,total:5500,insurance_rate:4400,out_of_pocket:1100 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3000,anesthesia:0,post_op:0,total:3000,insurance_rate:2400,out_of_pocket:600 },
      { name:"Spine Surgery (Lumbar Fusion)",surgeon_fee:120000,facility_fee:180000,anesthesia:40000,post_op:55000,total:395000,insurance_rate:316000,out_of_pocket:79000 },
    ],
    latitude: 12.9359, longitude: 77.5948, verified: true, emergency_line: "080-46110007", tier: "india"
  },
  {
    id: "33",
    name: "Kovai Medical Center Coimbatore",
    address: "99 Avanashi Road, Coimbatore, Tamil Nadu – 641014",
    city: "Coimbatore", state: "Tamil Nadu", pincode: "641014",
    phone: "+91-422-4323800", website: "https://www.kmchhospital.com",
    type: "Specialty", rating: 4.5, review_count: 3200, clarity_score: 82,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Orthopaedics","Neurology","Oncology","Urology"],
    insurance_accepted: ["Star Health","HDFC Ergo","CGHS","Bajaj Allianz","PMJAY"],
    treatments: [
      { name:"Cardiac Bypass",surgeon_fee:212000,facility_fee:312000,anesthesia:65000,post_op:106000,total:695000,insurance_rate:556000,out_of_pocket:139000 },
      { name:"Knee Replacement",surgeon_fee:78000,facility_fee:148000,anesthesia:29000,post_op:44000,total:299000,insurance_rate:239200,out_of_pocket:59800 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:6800,anesthesia:0,post_op:0,total:6800,insurance_rate:5440,out_of_pocket:1360 },
    ],
    latitude: 11.0168, longitude: 76.9558, verified: false, emergency_line: "422-4323800", tier: "india"
  },
  {
    id: "34",
    name: "Medanta Ranchi",
    address: "Argora Chowk, Ranchi, Jharkhand – 834002",
    city: "Ranchi", state: "Jharkhand", pincode: "834002",
    phone: "+91-651-3500000", website: "https://www.medanta.org",
    type: "Specialty", rating: 4.3, review_count: 2100, clarity_score: 78,
    er_available: true, er_wait_minutes: 25,
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Orthopaedics","General Surgery","Gynaecology","Paediatrics"],
    insurance_accepted: ["Star Health","CGHS","PMJAY","Bajaj Allianz"],
    treatments: [
      { name:"Angioplasty",surgeon_fee:78000,facility_fee:118000,anesthesia:24000,post_op:45000,total:265000,insurance_rate:212000,out_of_pocket:53000 },
      { name:"Knee Replacement",surgeon_fee:76000,facility_fee:145000,anesthesia:28000,post_op:42000,total:291000,insurance_rate:232800,out_of_pocket:58200 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7200,anesthesia:0,post_op:0,total:7200,insurance_rate:5760,out_of_pocket:1440 },
    ],
    latitude: 23.3441, longitude: 85.3096, verified: false, emergency_line: "651-3500000", tier: "india"
  },
  {
    id: "35",
    name: "Saveetha Medical College Chennai",
    address: "Velappanchavadi, Chennai, Tamil Nadu – 600077",
    city: "Chennai", state: "Tamil Nadu", pincode: "600077",
    phone: "+91-44-26801080", website: "https://www.saveethahospital.com",
    type: "Teaching", rating: 4.3, review_count: 2600, clarity_score: 77,
    er_available: true, er_wait_minutes: 28,
    image_url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Orthopaedics","Paediatrics","Dental"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","United India"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5800,anesthesia:0,post_op:0,total:5800,insurance_rate:4640,out_of_pocket:1160 },
      { name:"C-Section",surgeon_fee:48000,facility_fee:72000,anesthesia:16000,post_op:24000,total:160000,insurance_rate:128000,out_of_pocket:32000 },
      { name:"Appendectomy",surgeon_fee:27000,facility_fee:42000,anesthesia:11000,post_op:15000,total:95000,insurance_rate:76000,out_of_pocket:19000 },
    ],
    latitude: 13.1004, longitude: 80.1118, verified: false, emergency_line: "044-26801080", tier: "india"
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  DEHRADUN TOP 15
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "36",
    name: "Max Super Speciality Hospital Dehradun",
    address: "Mussoorie Diversion Road, Malsi, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-6690000", website: "https://www.maxhealthcare.in",
    type: "Specialty", rating: 4.4, review_count: 1820, clarity_score: 83,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiac Sciences","Orthopaedics","Neurology","Oncology","Urology","Gastroenterology"],
    insurance_accepted: ["Max Bupa","Star Health","CGHS","PMJAY","Bajaj Allianz"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:7500,anesthesia:0,post_op:0,total:7500,insurance_rate:6000,out_of_pocket:1500 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:4800,anesthesia:0,post_op:0,total:4800,insurance_rate:3840,out_of_pocket:960 },
      { name:"Angioplasty",surgeon_fee:100000,facility_fee:140000,anesthesia:28000,post_op:52000,total:320000,insurance_rate:256000,out_of_pocket:64000 },
      { name:"Knee Replacement",surgeon_fee:82000,facility_fee:152000,anesthesia:31000,post_op:47000,total:312000,insurance_rate:249600,out_of_pocket:62400 },
      { name:"Cardiac Bypass",surgeon_fee:220000,facility_fee:315000,anesthesia:68000,post_op:107000,total:710000,insurance_rate:568000,out_of_pocket:142000 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:42000,anesthesia:0,post_op:14000,total:56000,insurance_rate:44800,out_of_pocket:11200 },
      { name:"Laparoscopy",surgeon_fee:36000,facility_fee:55000,anesthesia:13000,post_op:18000,total:122000,insurance_rate:97600,out_of_pocket:24400 },
      { name:"Appendectomy",surgeon_fee:32000,facility_fee:48000,anesthesia:12000,post_op:17000,total:109000,insurance_rate:87200,out_of_pocket:21800 },
    ],
    latitude: 30.3753, longitude: 78.0322, verified: true, emergency_line: "135-6690000", tier: "dehradun"
  },
  {
    id: "37",
    name: "Himalayan Institute of Medical Sciences (HIMS)",
    address: "Swami Ram Nagar, Jolly Grant, Doiwala, Dehradun – 249203",
    city: "Dehradun", state: "Uttarakhand", pincode: "249203",
    phone: "+91-135-2471000", website: "https://www.hihtindia.org",
    type: "Teaching", rating: 4.4, review_count: 2890, clarity_score: 80,
    er_available: true, er_wait_minutes: 28,
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    specialties: ["All Medical Specialties","Ayurveda","Research","Trauma","Neurosurgery","Cardiology"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","ESIC","United India"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4500,anesthesia:0,post_op:0,total:4500,insurance_rate:3600,out_of_pocket:900 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3200,anesthesia:0,post_op:0,total:3200,insurance_rate:2560,out_of_pocket:640 },
      { name:"Knee Replacement",surgeon_fee:65000,facility_fee:120000,anesthesia:25000,post_op:35000,total:245000,insurance_rate:196000,out_of_pocket:49000 },
      { name:"Hip Replacement",surgeon_fee:62000,facility_fee:115000,anesthesia:23000,post_op:33000,total:233000,insurance_rate:186400,out_of_pocket:46600 },
      { name:"Appendectomy",surgeon_fee:28000,facility_fee:42000,anesthesia:11000,post_op:16000,total:97000,insurance_rate:77600,out_of_pocket:19400 },
      { name:"Laparoscopy",surgeon_fee:32000,facility_fee:50000,anesthesia:12000,post_op:17000,total:111000,insurance_rate:88800,out_of_pocket:22200 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2400,anesthesia:0,post_op:0,total:2400,insurance_rate:1920,out_of_pocket:480 },
      { name:"Angioplasty",surgeon_fee:88000,facility_fee:128000,anesthesia:26000,post_op:48000,total:290000,insurance_rate:232000,out_of_pocket:58000 },
    ],
    latitude: 30.1797, longitude: 78.1014, verified: true, emergency_line: "135-2471000", tier: "dehradun"
  },
  {
    id: "38",
    name: "Shri Mahant Indiresh Hospital",
    address: "Patel Nagar Bypass, Patel Nagar, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2760020", website: "https://www.indireshhospital.com",
    type: "General", rating: 4.2, review_count: 1280, clarity_score: 78,
    er_available: true, er_wait_minutes: 30,
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Orthopaedics","Paediatrics","ENT"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","National Insurance"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5500,anesthesia:0,post_op:0,total:5500,insurance_rate:4400,out_of_pocket:1100 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3500,anesthesia:0,post_op:0,total:3500,insurance_rate:2800,out_of_pocket:700 },
      { name:"C-Section",surgeon_fee:40000,facility_fee:60000,anesthesia:15000,post_op:20000,total:135000,insurance_rate:108000,out_of_pocket:27000 },
      { name:"Appendectomy",surgeon_fee:25000,facility_fee:38000,anesthesia:10000,post_op:14000,total:87000,insurance_rate:69600,out_of_pocket:17400 },
      { name:"Laparoscopy",surgeon_fee:30000,facility_fee:46000,anesthesia:12000,post_op:16000,total:104000,insurance_rate:83200,out_of_pocket:20800 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2200,anesthesia:0,post_op:0,total:2200,insurance_rate:1760,out_of_pocket:440 },
    ],
    latitude: 30.3245, longitude: 78.0435, verified: true, emergency_line: "135-2760020", tier: "dehradun"
  },
  {
    id: "39",
    name: "Synergy Institute of Medical Sciences",
    address: "Near Ballupur Chowk, Ballupur Canal Road, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-6677777", website: "https://www.synergyims.com",
    type: "Specialty", rating: 4.3, review_count: 960, clarity_score: 77,
    er_available: true, er_wait_minutes: 25,
    image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
    specialties: ["Cardiology","Neurology","Orthopaedics","Oncology","Urology"],
    insurance_accepted: ["Star Health","CGHS","Bajaj Allianz","Aditya Birla Health"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:6000,anesthesia:0,post_op:0,total:6000,insurance_rate:4800,out_of_pocket:1200 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3800,anesthesia:0,post_op:0,total:3800,insurance_rate:3040,out_of_pocket:760 },
      { name:"Cardiac Bypass",surgeon_fee:200000,facility_fee:280000,anesthesia:60000,post_op:90000,total:630000,insurance_rate:504000,out_of_pocket:126000 },
      { name:"Angioplasty",surgeon_fee:85000,facility_fee:125000,anesthesia:25000,post_op:47000,total:282000,insurance_rate:225600,out_of_pocket:56400 },
      { name:"Chemotherapy",surgeon_fee:0,facility_fee:38000,anesthesia:0,post_op:12000,total:50000,insurance_rate:40000,out_of_pocket:10000 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2500,anesthesia:0,post_op:0,total:2500,insurance_rate:2000,out_of_pocket:500 },
    ],
    latitude: 30.3398, longitude: 78.0664, verified: true, emergency_line: "135-6677777", tier: "dehradun"
  },
  {
    id: "40",
    name: "Doon Hospital (SGRR Medical College)",
    address: "New Road, Race Course, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2726020", website: "https://www.sgrrims.ac.in",
    type: "Government", rating: 4.0, review_count: 2140, clarity_score: 73,
    er_available: true, er_wait_minutes: 35,
    image_url: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Orthopaedics","Paediatrics","Emergency","Psychiatry"],
    insurance_accepted: ["CGHS","PMJAY","ESIC","Rashtriya Swasthya Bima Yojana"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:2500,anesthesia:0,post_op:0,total:2500,insurance_rate:2000,out_of_pocket:500 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:1800,anesthesia:0,post_op:0,total:1800,insurance_rate:1440,out_of_pocket:360 },
      { name:"C-Section",surgeon_fee:15000,facility_fee:25000,anesthesia:5000,post_op:8000,total:53000,insurance_rate:42400,out_of_pocket:10600 },
      { name:"Appendectomy",surgeon_fee:18000,facility_fee:28000,anesthesia:8000,post_op:10000,total:64000,insurance_rate:51200,out_of_pocket:12800 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:1800,anesthesia:0,post_op:0,total:1800,insurance_rate:1440,out_of_pocket:360 },
    ],
    latitude: 30.3244, longitude: 78.0339, verified: false, emergency_line: "135-2726020", tier: "dehradun"
  },
  {
    id: "41",
    name: "Pacific Hospital Dehradun",
    address: "Race Course Road, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2656969", website: "https://www.pacifichospital.in",
    type: "General", rating: 4.1, review_count: 820, clarity_score: 74,
    er_available: true, er_wait_minutes: 22,
    image_url: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Surgery","Medicine","Gynaecology","Paediatrics","Orthopaedics"],
    insurance_accepted: ["CGHS","Star Health","National Insurance"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5000,anesthesia:0,post_op:0,total:5000,insurance_rate:4000,out_of_pocket:1000 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3200,anesthesia:0,post_op:0,total:3200,insurance_rate:2560,out_of_pocket:640 },
      { name:"C-Section",surgeon_fee:35000,facility_fee:55000,anesthesia:13000,post_op:18000,total:121000,insurance_rate:96800,out_of_pocket:24200 },
      { name:"Laparoscopy",surgeon_fee:28000,facility_fee:44000,anesthesia:11000,post_op:15000,total:98000,insurance_rate:78400,out_of_pocket:19600 },
      { name:"Appendectomy",surgeon_fee:22000,facility_fee:34000,anesthesia:9000,post_op:12000,total:77000,insurance_rate:61600,out_of_pocket:15400 },
    ],
    latitude: 30.3243, longitude: 78.0339, verified: false, emergency_line: "135-2656969", tier: "dehradun"
  },
  {
    id: "42",
    name: "Kailash Hospital Dehradun",
    address: "Main Haridwar Road, Nathanpur, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2682244", website: "https://www.kailashhospital.in",
    type: "General", rating: 4.1, review_count: 610, clarity_score: 75,
    er_available: true, er_wait_minutes: 20,
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Orthopaedics","Surgery","Gynaecology","Paediatrics"],
    insurance_accepted: ["CGHS","PMJAY","Star Health"],
    treatments: [
      { name:"Knee Replacement",surgeon_fee:70000,facility_fee:130000,anesthesia:28000,post_op:42000,total:270000,insurance_rate:216000,out_of_pocket:54000 },
      { name:"Hip Replacement",surgeon_fee:65000,facility_fee:120000,anesthesia:25000,post_op:38000,total:248000,insurance_rate:198400,out_of_pocket:49600 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5800,anesthesia:0,post_op:0,total:5800,insurance_rate:4640,out_of_pocket:1160 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:3600,anesthesia:0,post_op:0,total:3600,insurance_rate:2880,out_of_pocket:720 },
      { name:"Appendectomy",surgeon_fee:24000,facility_fee:36000,anesthesia:10000,post_op:13000,total:83000,insurance_rate:66400,out_of_pocket:16600 },
    ],
    latitude: 30.3435, longitude: 78.0819, verified: false, emergency_line: "135-2682244", tier: "dehradun"
  },
  {
    id: "43",
    name: "Avicenna Hospital Dehradun",
    address: "Turner Road, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2742424", website: "https://www.avicennahospital.com",
    type: "Private", rating: 4.3, review_count: 730, clarity_score: 76,
    er_available: true, er_wait_minutes: 18,
    image_url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80",
    specialties: ["Internal Medicine","Cardiology","Surgery","Gynaecology","Dermatology"],
    insurance_accepted: ["Star Health","Bajaj Allianz","CGHS","HDFC Ergo"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:6500,anesthesia:0,post_op:0,total:6500,insurance_rate:5200,out_of_pocket:1300 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:4200,anesthesia:0,post_op:0,total:4200,insurance_rate:3360,out_of_pocket:840 },
      { name:"Angioplasty",surgeon_fee:80000,facility_fee:118000,anesthesia:24000,post_op:44000,total:266000,insurance_rate:212800,out_of_pocket:53200 },
      { name:"Laparoscopy",surgeon_fee:28000,facility_fee:43000,anesthesia:11000,post_op:15000,total:97000,insurance_rate:77600,out_of_pocket:19400 },
      { name:"Cataract Surgery",surgeon_fee:22000,facility_fee:32000,anesthesia:4000,post_op:8000,total:66000,insurance_rate:52800,out_of_pocket:13200 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2200,anesthesia:0,post_op:0,total:2200,insurance_rate:1760,out_of_pocket:440 },
    ],
    latitude: 30.3328, longitude: 78.0438, verified: false, emergency_line: "135-2742424", tier: "dehradun"
  },
  {
    id: "44",
    name: "Sanjay Orthopaedic & Spine Hospital",
    address: "48 Rajpur Road, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2747575", website: "https://www.sanjayorthopedic.com",
    type: "Specialty", rating: 4.2, review_count: 540, clarity_score: 72,
    er_available: false, er_wait_minutes: null,
    image_url: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop&q=80",
    specialties: ["Orthopaedics","Spine Surgery","Joint Replacement","Sports Medicine"],
    insurance_accepted: ["Star Health","CGHS","Bajaj Allianz","National Insurance"],
    treatments: [
      { name:"Knee Replacement",surgeon_fee:75000,facility_fee:140000,anesthesia:29000,post_op:44000,total:288000,insurance_rate:230400,out_of_pocket:57600 },
      { name:"Hip Replacement",surgeon_fee:70000,facility_fee:130000,anesthesia:27000,post_op:40000,total:267000,insurance_rate:213600,out_of_pocket:53400 },
      { name:"Spine Surgery (Lumbar Fusion)",surgeon_fee:95000,facility_fee:145000,anesthesia:35000,post_op:48000,total:323000,insurance_rate:258400,out_of_pocket:64600 },
    ],
    latitude: 30.3290, longitude: 78.0503, verified: false, emergency_line: "135-2747575", tier: "dehradun"
  },
  {
    id: "45",
    name: "Doon Valley Hospital Dehradun",
    address: "Haridwar Bypass Road, Rishikesh Chowk, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2525252", website: "https://www.doonvalleyhospital.com",
    type: "Private", rating: 4.0, review_count: 490, clarity_score: 70,
    er_available: true, er_wait_minutes: 30,
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Paediatrics","ENT"],
    insurance_accepted: ["CGHS","Star Health","National Insurance"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:5200,anesthesia:0,post_op:0,total:5200,insurance_rate:4160,out_of_pocket:1040 },
      { name:"C-Section",surgeon_fee:32000,facility_fee:50000,anesthesia:12000,post_op:16000,total:110000,insurance_rate:88000,out_of_pocket:22000 },
      { name:"Appendectomy",surgeon_fee:20000,facility_fee:32000,anesthesia:9000,post_op:12000,total:73000,insurance_rate:58400,out_of_pocket:14600 },
    ],
    latitude: 30.3180, longitude: 78.0564, verified: false, emergency_line: "135-2525252", tier: "dehradun"
  },
  {
    id: "46",
    name: "Graphic Era Hospital Dehradun",
    address: "566/6 Bell Road, Clement Town, Dehradun – 248002",
    city: "Dehradun", state: "Uttarakhand", pincode: "248002",
    phone: "+91-135-2262510", website: "https://www.graphicera.edu.in",
    type: "Teaching", rating: 4.1, review_count: 720, clarity_score: 71,
    er_available: true, er_wait_minutes: 28,
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Paediatrics","Orthopaedics","Community Medicine"],
    insurance_accepted: ["CGHS","PMJAY","Star Health","ESIC"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4800,anesthesia:0,post_op:0,total:4800,insurance_rate:3840,out_of_pocket:960 },
      { name:"CT Scan",surgeon_fee:0,facility_fee:2800,anesthesia:0,post_op:0,total:2800,insurance_rate:2240,out_of_pocket:560 },
      { name:"Appendectomy",surgeon_fee:22000,facility_fee:33000,anesthesia:9000,post_op:13000,total:77000,insurance_rate:61600,out_of_pocket:15400 },
      { name:"Laparoscopy",surgeon_fee:26000,facility_fee:40000,anesthesia:10000,post_op:14000,total:90000,insurance_rate:72000,out_of_pocket:18000 },
      { name:"C-Section",surgeon_fee:30000,facility_fee:48000,anesthesia:12000,post_op:16000,total:106000,insurance_rate:84800,out_of_pocket:21200 },
    ],
    latitude: 30.2799, longitude: 77.9924, verified: false, emergency_line: "135-2262510", tier: "dehradun"
  },
  {
    id: "47",
    name: "Shivalik Hospital & Research Centre",
    address: "Premnagar, Haridwar Road, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2753453", website: "https://www.shivalikhospital.com",
    type: "General", rating: 4.0, review_count: 430, clarity_score: 68,
    er_available: true, er_wait_minutes: 32,
    image_url: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Paediatrics","Dermatology"],
    insurance_accepted: ["CGHS","PMJAY","Star Health"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4500,anesthesia:0,post_op:0,total:4500,insurance_rate:3600,out_of_pocket:900 },
      { name:"C-Section",surgeon_fee:28000,facility_fee:44000,anesthesia:11000,post_op:14000,total:97000,insurance_rate:77600,out_of_pocket:19400 },
      { name:"Dialysis",surgeon_fee:0,facility_fee:2100,anesthesia:0,post_op:0,total:2100,insurance_rate:1680,out_of_pocket:420 },
    ],
    latitude: 30.3022, longitude: 78.0158, verified: false, emergency_line: "135-2753453", tier: "dehradun"
  },
  {
    id: "48",
    name: "Vinayak Hospital Dehradun",
    address: "GMS Road, Bakralwala, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2698888", website: "https://www.vinayakhospital.in",
    type: "Private", rating: 4.0, review_count: 380, clarity_score: 69,
    er_available: true, er_wait_minutes: 28,
    image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Orthopaedics","Gynaecology","ENT"],
    insurance_accepted: ["CGHS","Star Health","National Insurance"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4800,anesthesia:0,post_op:0,total:4800,insurance_rate:3840,out_of_pocket:960 },
      { name:"Knee Replacement",surgeon_fee:68000,facility_fee:125000,anesthesia:26000,post_op:40000,total:259000,insurance_rate:207200,out_of_pocket:51800 },
      { name:"Laparoscopy",surgeon_fee:24000,facility_fee:38000,anesthesia:10000,post_op:13000,total:85000,insurance_rate:68000,out_of_pocket:17000 },
    ],
    latitude: 30.3315, longitude: 78.0782, verified: false, emergency_line: "135-2698888", tier: "dehradun"
  },
  {
    id: "49",
    name: "Shree Mahavir Healthcare Dehradun",
    address: "Kalidas Road, Dalanwala, Dehradun – 248001",
    city: "Dehradun", state: "Uttarakhand", pincode: "248001",
    phone: "+91-135-2654321", website: "https://www.shreemahavir.com",
    type: "Private", rating: 3.9, review_count: 310, clarity_score: 66,
    er_available: false, er_wait_minutes: null,
    image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Gynaecology","Paediatrics","Surgery"],
    insurance_accepted: ["CGHS","Star Health"],
    treatments: [
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4200,anesthesia:0,post_op:0,total:4200,insurance_rate:3360,out_of_pocket:840 },
      { name:"C-Section",surgeon_fee:26000,facility_fee:40000,anesthesia:10000,post_op:13000,total:89000,insurance_rate:71200,out_of_pocket:17800 },
      { name:"Appendectomy",surgeon_fee:18000,facility_fee:28000,anesthesia:8000,post_op:11000,total:65000,insurance_rate:52000,out_of_pocket:13000 },
    ],
    latitude: 30.3218, longitude: 78.0441, verified: false, emergency_line: "135-2654321", tier: "dehradun"
  },
  {
    id: "50",
    name: "Herbertpur Christian Hospital",
    address: "Herbertpur, Vikasnagar, Dehradun – 248142",
    city: "Dehradun", state: "Uttarakhand", pincode: "248142",
    phone: "+91-135-2690200", website: "https://www.herbertpurchristianhospital.com",
    type: "General", rating: 4.2, review_count: 560, clarity_score: 72,
    er_available: true, er_wait_minutes: 26,
    image_url: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&auto=format&fit=crop&q=80",
    specialties: ["General Medicine","Surgery","Gynaecology","Paediatrics","Ophthalmology","Community Health"],
    insurance_accepted: ["CGHS","PMJAY","Star Health"],
    treatments: [
      { name:"Cataract Surgery",surgeon_fee:14000,facility_fee:20000,anesthesia:3000,post_op:5000,total:42000,insurance_rate:33600,out_of_pocket:8400 },
      { name:"C-Section",surgeon_fee:24000,facility_fee:38000,anesthesia:10000,post_op:13000,total:85000,insurance_rate:68000,out_of_pocket:17000 },
      { name:"Appendectomy",surgeon_fee:19000,facility_fee:29000,anesthesia:8000,post_op:11000,total:67000,insurance_rate:53600,out_of_pocket:13400 },
      { name:"MRI Scan",surgeon_fee:0,facility_fee:4600,anesthesia:0,post_op:0,total:4600,insurance_rate:3680,out_of_pocket:920 },
    ],
    latitude: 30.4231, longitude: 77.9083, verified: false, emergency_line: "135-2690200", tier: "dehradun"
  },
];

// ── Pincode map ───────────────────────────────────────────────────────────────
export const PINCODE_MAP = {
  "248001":"Dehradun","248002":"Dehradun","248003":"Dehradun","248142":"Dehradun","249203":"Dehradun",
  "110001":"New Delhi","110002":"New Delhi","110005":"New Delhi","110017":"New Delhi","110029":"New Delhi","110060":"New Delhi","110076":"New Delhi","110085":"New Delhi",
  "122001":"Gurugram","122002":"Gurugram","122003":"Gurugram","122004":"Gurugram",
  "400001":"Mumbai","400011":"Mumbai","400012":"Mumbai","400016":"Mumbai","400026":"Mumbai","400050":"Mumbai","400053":"Mumbai","400063":"Mumbai",
  "600001":"Chennai","600006":"Chennai","600020":"Chennai","600077":"Chennai","632004":"Vellore","641014":"Coimbatore",
  "560001":"Bengaluru","560017":"Bengaluru","560029":"Bengaluru","560038":"Bengaluru","560055":"Bengaluru","560099":"Bengaluru",
  "302001":"Jaipur","302004":"Jaipur","302015":"Jaipur",
  "380001":"Ahmedabad","380015":"Ahmedabad",
  "500001":"Hyderabad","500003":"Hyderabad","500032":"Hyderabad","500036":"Hyderabad",
  "700001":"Kolkata","700017":"Kolkata","700099":"Kolkata",
  "411001":"Pune","411004":"Pune",
  "160012":"Chandigarh",
  "226030":"Lucknow",
  "834002":"Ranchi",
  "682041":"Kochi",
  "249203":"Rishikesh",
};

export const TREATMENTS = [
  "MRI Scan","CT Scan","Angioplasty","Cardiac Bypass","Knee Replacement","Hip Replacement",
  "Liver Transplant","Kidney Transplant","Bone Marrow Transplant","C-Section","Cataract Surgery",
  "Spine Surgery (Lumbar Fusion)","Robotic Surgery","Chemotherapy","Dialysis","Appendectomy",
  "Laparoscopy","Radiation Therapy","Endoscopy"
];

// ── Smart search — honest empty results ───────────────────────────────────────
export function searchHospitals({ treatment, pincode, city, query }) {
  let pool = [...HOSPITALS];

  let locationFiltered = false;
  if (pincode && pincode.trim().length === 6) {
    const mappedCity = PINCODE_MAP[pincode.trim()];
    if (mappedCity) {
      pool = pool.filter(h =>
        h.city.toLowerCase() === mappedCity.toLowerCase() ||
        h.pincode === pincode.trim()
      );
      locationFiltered = true;
    } else {
      // Unknown pincode → no results
      return [];
    }
  } else if (city && city.trim().length >= 2) {
    const c = city.trim().toLowerCase();
    const cityFiltered = pool.filter(h =>
      h.city.toLowerCase().includes(c) ||
      h.state.toLowerCase().includes(c) ||
      h.address.toLowerCase().includes(c)
    );
    pool = cityFiltered;
    locationFiltered = true;
  }

  if (treatment && treatment.trim().length >= 2) {
    const t = treatment.trim().toLowerCase();
    const withTreatment = pool.filter(h =>
      h.treatments.some(tr => tr.name.toLowerCase().includes(t)) ||
      h.specialties.some(s => s.toLowerCase().includes(t)) ||
      h.name.toLowerCase().includes(t)
    );

    if (withTreatment.length > 0) {
      pool = withTreatment;
    } else if (!locationFiltered) {
      const broadMatch = HOSPITALS.filter(h =>
        h.specialties.some(s => s.toLowerCase().includes(t)) ||
        h.treatments.some(tr => tr.name.toLowerCase().includes(t))
      );
      pool = broadMatch;
    } else {
      pool = [];
    }
  }

  if (query && query.trim().length >= 2) {
    const q = query.trim().toLowerCase();
    pool = pool.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      h.specialties.some(s => s.toLowerCase().includes(q)) ||
      h.treatments.some(tr => tr.name.toLowerCase().includes(q))
    );
  }

  return pool.sort((a, b) => b.clarity_score - a.clarity_score);
}

export const INDIA_HOSPITALS    = HOSPITALS.filter(h => h.tier === "india");
export const DEHRADUN_HOSPITALS = HOSPITALS.filter(h => h.tier === "dehradun");