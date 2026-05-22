
const fs = require("fs");

function createQuestion(id, subject, text, options, correctIndex) {
  return { id, subject, text, options, correctAnswer: correctIndex };
}

// Data pools
const mathPool = [
  ["If log_x(16) = 2, then x is:", ["2", "4", "8", "6"], 1],
  ["The derivative of sin(x) is:", ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], 0],
  ["The value of limit x->0 (sin x)/x is:", ["0", "1", "infinity", "Does not exist"], 1],
  ["The matrix A is idempotent if:", ["A^2 = I", "A^2 = A", "A^T = A", "A^-1 = A"], 1],
  ["Integration of 1/x dx is:", ["e^x + c", "x^2/2 + c", "ln|x| + c", "-1/x^2 + c"], 2],
  ["The eccentricity of a parabola is:", ["e = 0", "e < 1", "e = 1", "e > 1"], 2],
  ["The sum of roots of x^2 - 5x + 6 = 0 is:", ["6", "-5", "5", "-6"], 2],
  ["Two lines are perpendicular if the product of their slopes is:", ["1", "0", "-1", "infinity"], 2],
  ["Probability of an impossible event is:", ["1", "0.5", "0", "None"], 2],
  ["The scalar product of mutually perpendicular vectors is:", ["1", "0", "-1", "None"], 1],
  ["The center of a circle x^2 + y^2 = 9 is:", ["(1,1)", "(0,0)", "(3,3)", "(9,9)"], 1],
  ["The general solution of sin x = 0 is:", ["n * pi", "2n * pi", "pi/2", "None"], 0],
  ["Domain of f(x) = sqrt(x-1) is:", ["x > 0", "x >= 1", "Real numbers", "x < 1"], 1],
  ["If A and B are symmetric, AB = BA if and only if:", ["A = B", "A = I", "AB is symmetric", "None"], 2],
  ["Solution of 2^x = 8 is:", ["2", "3", "4", "5"], 1],
  ["Value of i^4 is:", ["-1", "i", "-i", "1"], 3],
  ["Radius of circle x^2 + y^2 = 16 is:", ["16", "8", "4", "2"], 2],
  ["Maximum value of sin(x) is:", ["0", "1", "-1", "infinity"], 1],
  ["Function f(x)=x^2 is:", ["Even", "Odd", "Both", "None"], 0],
  ["Vector has:", ["Magnitude only", "Direction only", "Both", "None"], 2],
  ["Number of ways to arrange letters in 'CAT':", ["3", "6", "9", "1"], 1],
  ["If z = 3+4i, |z| is:", ["3", "4", "5", "7"], 2],
  ["Differential of constant c is:", ["c", "1", "0", "x"], 2],
  ["Equation of x-axis is:", ["x=0", "y=0", "x=y", "None"], 1],
  ["Number of terms in binomial expansion (a+b)^n:", ["n", "n+1", "n-1", "2n"], 1],
  ["If f(x) = 2x + 3, f(-1) is:", ["1", "-1", "5", "0"], 0],
  ["Slope of line 2x - y = 5 is:", ["2", "-2", "1/2", "5"], 0],
  ["What is the sum of angles in a triangle?", ["90", "180", "360", "270"], 1]
];

const physPool = [
  ["Dimensional formula for force is:", ["MLT^-1", "ML^2T^-2", "MLT^-2", "ML^2T^-1"], 2],
  ["Friction force acts:", ["In direction of motion", "Opposite to motion", "Perpendicular to motion", "Depends on mass"], 1],
  ["SI unit of work is:", ["Newton", "Watt", "Joule", "Pascal"], 2],
  ["Escape velocity from earth is approximately:", ["11.2 km/s", "8 km/s", "300,000 km/s", "9.8 m/s"], 0],
  ["According to Ohm's Law, V is directly proportional to:", ["R", "I", "P", "T"], 1],
  ["Speed of light in vacuum is:", ["3*10^8 m/s", "3*10^6 m/s", "3*10^5 km/s", "A and C"], 3],
  ["Sound waves are:", ["Transverse", "Electromagnetic", "Longitudinal", "None"], 2],
  ["Device used to measure current is:", ["Voltmeter", "Ammeter", "Galvanometer", "Ohmmeter"], 1],
  ["Concave mirror forms:", ["Real image only", "Virtual only", "Real or virtual", "None"], 2],
  ["Half life of a radioactive substance relies on:", ["Temperature", "Pressure", "Initial mass", "Decay constant"], 3],
  ["Capacitors store:", ["Current", "Charge", "Voltage", "Power"], 1],
  ["Acceleration due to gravity g is max at:", ["Equator", "Poles", "Center of Earth", "Same everywhere"], 1],
  ["Semiconductor temp coefficient of resistance is:", ["Positive", "Negative", "Zero", "Infinite"], 1],
  ["Lens formula is:", ["1/f = 1/v + 1/u", "1/f = 1/v - 1/u", "f = vu/(v+u)", "None"], 1],
  ["When a body moves in uniform circular motion, work done is:", ["Zero", "Maximum", "Negative", "None"], 0],
  ["SI unit of magnetic field is:", ["Tesla", "Weber", "Henry", "Faraday"], 0],
  ["Power is equal to:", ["Work / time", "Force * distance", "Mass * Acc", "None"], 0],
  ["Hydraulic brakes work on the principle of:", ["Archimedes", "Bernoulli", "Pascal", "Newton"], 2],
  ["Boiling point of water at 1 atm is:", ["0 C", "100 C", "273 K", "373 C"], 1],
  ["Which particle is not present in nucleus?", ["Proton", "Neutron", "Electron", "Meson"], 2],
  ["Light Year is unit of:", ["Time", "Speed", "Distance", "Mass"], 2],
  ["Momentum is:", ["Mass * Velocity", "Mass * Acceleration", "Force * Time", "Both A and C"], 3],
  ["Doppler effect applies to:", ["Sound only", "Light only", "Both Sound and Light", "Heat"], 2],
  ["Number of significant figures in 0.0050 is:", ["1", "2", "3", "4"], 1],
  ["Which radiation is most penetrating?", ["Alpha", "Beta", "Gamma", "X-Rays"], 2]
];

const chemPool = [
  ["Atomic number of oxygen is:", ["6", "7", "8", "9"], 2],
  ["pH of a neutral solution at 25°C is:", ["0", "7", "14", "1"], 1],
  ["Most abundant gas in atmosphere is:", ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 1],
  ["Which is a noble gas?", ["Chlorine", "Fluorine", "Argon", "Oxygen"], 2],
  ["Avogadro's number is approximately:", ["6.022 * 10^23", "6.022 * 10^24", "9.1 * 10^-31", "3 * 10^8"], 0],
  ["Formula of Baking Soda is:", ["NaHCO3", "Na2CO3", "NaCl", "NaOH"], 0],
  ["Oxidation involves:", ["Gain of electrons", "Loss of electrons", "Gain of hydrogen", "None"], 1],
  ["Diamond is an allotrope of:", ["Silicon", "Carbon", "Sulfur", "Phosphorus"], 1],
  ["Covalent bonds are formed by:", ["Transfer of electrons", "Sharing of electrons", "Loss of protons", "None"], 1],
  ["Which metal is liquid at standard room temperature?", ["Iron", "Mercury", "Gallium", "Sodium"], 1],
  ["Molarity is defined as:", ["Moles of solute / L of solution", "Mass of solute / Mass of solvent", "Moles of solute / kg of solvent", "None"], 0],
  ["Functional group of alcohol is:", ["-CHO", "-COOH", "-OH", "-CO-"], 2],
  ["General formula of alkanes is:", ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"], 1],
  ["Isotopes have same:", ["Mass number", "Atomic number", "Number of neutrons", "Physical properties"], 1],
  ["Simplest amino acid is:", ["Alanine", "Glycine", "Valine", "Lysine"], 1],
  ["Process of converting solid directly to gas is:", ["Evaporation", "Condensation", "Sublimation", "Melting"], 2],
  ["Benzene formula is:", ["C6H12", "C6H6", "C5H10", "CH4"], 1],
  ["Which of these is a weak acid?", ["HCl", "H2SO4", "HNO3", "CH3COOH"], 3],
  ["Father of modern chemistry:", ["Newton", "Lavoisier", "Boyle", "Dalton"], 1],
  ["Ozone layer is present in:", ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], 1],
  ["Brass is an alloy of:", ["Copper & Zinc", "Copper & Tin", "Iron & Carbon", "Lead & Tin"], 0],
  ["Maximum electrons in M shell:", ["8", "18", "32", "2"], 1],
  ["Saponification is a process to make:", ["Cement", "Glass", "Soap", "Plastic"], 2],
  ["What is heavy water?", ["H2O", "D2O", "T2O", "H2O2"], 1],
  ["Chalcogens belong to group:", ["15", "16", "17", "18"], 1]
];

const engPool = [
  ["He prefers tea ____ coffee.", ["than", "over", "to", "for"], 2],
  ["Choose the correct spelling:", ["Accomodation", "Accommodation", "Accomodation", "Acommodation"], 1],
  ["Synonym for 'Abundant' is:", ["Scarce", "Plentiful", "Rare", "Short"], 1],
  ["Antonym of 'Pessimistic' is:", ["Sad", "Optimistic", "Hopeless", "Dark"], 1],
  ["The passive voice of 'He writes a letter':", ["A letter is written by him", "A letter was written by him", "A letter is writing by him", "He is written by a letter"], 0],
  ["'Break the ice' means:", ["To melt ice", "To start a conversation", "To create a problem", "To finish a task"], 1],
  ["I have been living here ____ 2010.", ["since", "for", "from", "till"], 0],
  ["Either he or his friends ____ guilty.", ["is", "are", "have", "has"], 1],
  ["Identify adjective: 'The red car is fast.'", ["The", "car", "red", "is"], 2],
  ["I am looking forward to ____ you.", ["see", "seeing", "saw", "seen"], 1],
  ["What is a prefix of 'happy'?", ["un", "in", "dis", "im"], 0],
  ["Choose indirect speech: He said, 'I am ill.'", ["He says he is ill", "He said that he was ill", "He said he is ill", "He told he was ill"], 1],
  ["If I ____ a bird, I would fly.", ["am", "was", "were", "be"], 2],
  ["We should abide ____ the rules.", ["to", "on", "by", "with"], 2],
  ["Plural of 'Child' is:", ["Childs", "Childrens", "Children", "Childes"], 2]
];

const itPool = [
  ["Brain of the computer is:", ["RAM", "ROM", "CPU", "Hard Disk"], 2],
  ["URL stands for:", ["Uniform Resource Locator", "Universal Resource Link", "Uniform Registered Link", "Unified Resource Locator"], 0],
  ["1 Byte is equal to:", ["4 bits", "8 bits", "16 bits", "10 bits"], 1],
  ["Which of these is a volatile memory?", ["ROM", "Flash Drive", "RAM", "CD"], 2],
  ["HTTP port number is normally:", ["21", "22", "80", "443"], 2],
  ["Binary equivalent of decimal 10 is:", ["1010", "1001", "1100", "0101"], 0],
  ["In Boolean logic, A + A' equals:", ["0", "1", "A", "A'"], 1],
  ["LAN stands for:", ["Local Area Network", "Large Area Network", "Logical Area Network", "Link Area Network"], 0],
  ["Which is an example of an OS?", ["MS Word", "Linux", "Oracle", "Java"], 1],
  ["A bug in a program is known as:", ["Error", "Feature", "Glitch", "A and C"], 3]
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildSet(setId, title, m, p, c, e, it) {
  let qList = [];
  let qNum = 1;
  const pushSub = (arr, subject, limit) => {
    const shuffledArr = shuffle(arr).slice(0, limit);
    shuffledArr.forEach(itm => {
      qList.push(createQuestion(setId + "-q" + qNum, subject, itm[0], itm[1], itm[2]));
      qNum++;
    });
  };
  pushSub(m, "Math", 25);
  pushSub(p, "Physics", 25);
  pushSub(c, "Chemistry", 25);
  pushSub(e, "English", 15);
  pushSub(it, "IT", 10);
  return { setId, title, questions: qList };
}

const sets = [
  buildSet("set1", "HamroCSIT Model Pattern Set 1", mathPool, physPool, chemPool, engPool, itPool),
  buildSet("set2", "TU Official Past Year Model Set 2079", mathPool, physPool, chemPool, engPool, itPool),
  buildSet("set3", "CSIT Extra Practice Set A", mathPool, physPool, chemPool, engPool, itPool),
  buildSet("set4", "CSIT Extra Practice Set B", mathPool, physPool, chemPool, engPool, itPool),
  buildSet("set5", "Grand Mock Test 2080", mathPool, physPool, chemPool, engPool, itPool)
];

fs.writeFileSync("d:/UmeshTests/CSIT/csit-app/src/datas/mcqData.json", JSON.stringify(sets, null, 2));
console.log("Successfully generated 5 sets!");

