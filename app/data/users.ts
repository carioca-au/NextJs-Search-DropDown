// data/users.ts
// export const users = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   name: `User ${i + 1}`
// }));

const companies = [
"A2M - The a2 Milk Company Ltd",
"ABC - Adbri Ltd",
"ABP - Abacus Property Group",
"AGL - AGL Energy Ltd",
"ALD - Ampol Ltd",
"ALL - Aristocrat Leisure Ltd",
"ALQ - ALS Ltd",
"ALU - Altium Ltd",
"AMC - Amcor Plc",
"AMP - AMP Ltd",
"ANN - Ansell Ltd",
"ANZ - Australia and New Zealand Banking Group Ltd",
"APA - APA Group",
"APE - Eagers Automotive Ltd",
"ARB - ARB Corporation Ltd",
"ASX - ASX Ltd",
"AWC - Alumina Ltd",
"AZJ - Aurizon Holdings Ltd",
"BAP - Bapcor Ltd",
"BEN - Bendigo and Adelaide Bank Ltd",
"BHP - BHP Group Ltd",
"BLD - Boral Ltd",
"BOQ - Bank of Queensland Ltd",
"BPT - Beach Energy Ltd",
"BRG - Breville Group Ltd",
"BSL - Bluescope Steel Ltd",
"BWP - BWP Trust",
"BXB - Brambles Ltd",
"CAR - Carsales.com Ltd",
"CBA - Commonwealth Bank of Australia",
"CCP - Credit Corp Group Ltd",
"CGF - Challenger Ltd",
"CHC - Charter Hall Group",
"CIM - Cimic Group Ltd",
"COH - Cochlear Ltd",
"COL - Coles Group Ltd",
"CPU - Computershare Ltd",
"CSL - CSL Ltd",
"CSR - CSR Ltd",
"CTD - Corporate Travel Management Ltd",
]

export const users = companies.map((company, i)=>{
  return {
    "id": i,
    "name": company,
  }
})



export const fetchUsers = async (searchTerm: string) => {
  "use server"; 
  return users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
