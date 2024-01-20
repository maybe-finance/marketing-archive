// source: https://hypercolor.dev/
const GRADIENTS = [
  "bg-gradient-to-br from-blue to-teal",
  "bg-gradient-to-br from-purple to-teal",
  "bg-gradient-to-br from-red via-lilac to-teal",
  "bg-gradient-to-br from-purple to-pink",
  "bg-gradient-to-br from-yellow via-orange to-red",
  "bg-gradient-to-br from-pink via-red to-yellow",
  "bg-gradient-to-br from-green via-blue to-purple",
  "bg-gradient-to-br from-pink via-purple to-indigo",
  "bg-gradient-to-br from-yellow via-green to-green",
  "bg-gradient-to-br from-red via-red to-yellow",
  "bg-gradient-to-br from-green via-green to-blue",
  "bg-gradient-to-br from-green via-green to-purple",
  "bg-gradient-to-br from-red to-red",
  "bg-gradient-to-br from-purple via-purple to-purple",
  "bg-gradient-to-br from-gray via-gray to-blue",
  "bg-gradient-to-br from-purple to-yellow",
  "bg-gradient-to-br from-red via-gray to-blue",
  "bg-gradient-to-br from-red via-yellow to-yellow",
  "bg-gradient-to-br from-blue via-green to-yellow",
  "bg-gradient-to-br from-yellow via-green to-green",
  "bg-gradient-to-br from-blue via-blue to-gray",
  "bg-gradient-to-br from-green to-purple",
  "bg-gradient-to-br from-yellow via-pink to-pink",
];

const getStableGradient = (index: number): string => {
  const gradientIndex = index % GRADIENTS.length;

  return GRADIENTS[gradientIndex];
};

export default {
  getStableGradient,
};
