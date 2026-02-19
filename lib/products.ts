export interface MOSFET {
    id: string;
    partNumber: string;
    vDs: number;          // Voltage (V)
    iD: number;           // Current (A)
    rdsOn: number;        // Resistance (mΩ) - Lower is more efficient
    packageType: string;
    price: number;
    inStock: boolean;
    productUrl: string;
  }
 
  export const Products: MOSFET[] = [
    {
      id: "1",
      partNumber: "IMZA120R020M1H",
      vDs: 1200,
      iD: 72,
      rdsOn: 20,
      packageType: "TO-247-4",
      price: 18.50,
      inStock: false,
      productUrl: "https://www.infineon.com/part/IMZA120R020M1H"
    },
    {
      id: "2",
      partNumber: "IMW120R040M1H",
      vDs: 1200,
      iD: 55,
      rdsOn: 40,
      packageType: "TO-247-3",
      price: 11.72,
      inStock: true,
      productUrl: "https://www.infineon.com/part/IMW120R040M1H"
    },
    {
      id: "3",
      partNumber: "IMBG120R030M1H",
      vDs: 1200,
      iD: 60,
      rdsOn: 30,
      packageType: "D2PAK-7",
      price: 15.75,
      inStock: true,
      productUrl: "https://www.infineon.com/part/IMBG120R030M1H"
    },
    {
      id: "4",
      partNumber: "IMZA120R060M1H",
      vDs: 1200,
      iD: 36,
      rdsOn: 60,
      packageType: "TO-247-4",
      price: 9.80,
      inStock: true,
      productUrl: "https://www.infineon.com/part/IMZA120R040M1H"
    }
  ];