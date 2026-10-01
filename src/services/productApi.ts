export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function fetchProducts(): Promise<Product[]> {
  return [
    {
      id: 1,
      title: 'Cơm gà xối mỡ',
      price: 45000,
      description: 'Cơm nóng ăn kèm gà chiên giòn, dưa leo và nước mắm.',
      category: 'Cơm',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
    },
    {
      id: 2,
      title: 'Mì trộn xúc xích',
      price: 35000,
      description: 'Mì trộn sốt cay nhẹ cùng xúc xích, trứng và rau xanh.',
      category: 'Mì',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600',
    },
    {
      id: 3,
      title: 'Bún thịt nướng',
      price: 40000,
      description: 'Bún tươi, thịt nướng thơm, rau sống và nước mắm chua ngọt.',
      category: 'Bún',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600',
    },
    {
      id: 4,
      title: 'Phở bò tái',
      price: 50000,
      description: 'Phở bò nước dùng đậm đà, thịt bò tái và rau thơm.',
      category: 'Phở',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600',
    },
    {
      id: 5,
      title: 'Trà đào cam sả',
      price: 25000,
      description: 'Trà đào mát lạnh, thơm vị cam sả, phù hợp dùng cùng bữa ăn.',
      category: 'Nước uống',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
    },
    {
      id: 6,
      title: 'Trà sữa trân châu',
      price: 30000,
      description: 'Trà sữa béo nhẹ với trân châu dai mềm.',
      category: 'Nước uống',
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600',
    },
    {
      id: 7,
      title: 'Khoai tây chiên',
      price: 25000,
      description: 'Khoai tây chiên giòn, dùng kèm tương ớt hoặc tương cà.',
      category: 'Ăn vặt',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
    },
    {
      id: 8,
      title: 'Bánh mì thịt nướng',
      price: 30000,
      description: 'Bánh mì giòn, thịt nướng, đồ chua và rau thơm.',
      category: 'Bánh mì',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
    },
  ];
}