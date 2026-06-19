export interface Recipe {
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  isAvailable: boolean;
  image: string;
  description: string;
  features: string[];
  packSizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "premium-idly-rava",
    name: "Premium Idly Rava",
    category: "Ravas",
    isAvailable: true,
    image: "/products/idly rawa.png",
    description: "Premium double-roasted idly rava made from the finest grains, perfect for soft, fluffy, and authentic idlis.",
    features: ["100% Sortex Cleaned", "Double Roasted for Aroma", "No Added Preservatives", "Perfect Granulation"],
    packSizes: ["500g / 1kg"]
  },
  {
    id: "bombay-suji",
    name: "Bombay Suji",
    category: "Ravas",
    isAvailable: false,
    image: "/products/bombay suji.jpeg",
    description: "Superior quality Bombay Suji ground from premium wheat. Ideal for crispy rava dosas, soft upmas, and delicious kesari bath.",
    features: ["Finest Wheat Semolina", "Rich in Natural Nutrients", "Hygienically Processed", "Consistent Quality"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "bansi-suji",
    name: "Bansi Suji",
    category: "Ravas",
    isAvailable: false,
    image: "/products/bansi suji.jpeg",
    description: "Traditional golden Bansi Suji made from premium durum wheat. Yields rich aroma and excellent texture for sheera and ladoos.",
    features: [" durum wheat semolina", "Golden Color & Texture", "High Dietary Fiber", "Authentic Taste"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "little-millet-idli-rava",
    name: "Little Millet Idli Rava",
    category: "Pohas & Millets",
    isAvailable: false,
    image: "/products/little millet Idli rava.jpeg",
    description: "Nutrient-rich, gluten-free Little Millet Idli Rava. Ideal for a healthy, diabetic-friendly breakfast including millet idli, dosa, and appe.",
    features: ["Gluten-Free & Organic", "High in Protein & Fiber", "Low Glycemic Index", "Stone Ground Purity"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "ragi-flour",
    name: "Ragi Flour",
    category: "Healthy Flours",
    isAvailable: false,
    image: "/products/Ragi Flour.jpeg",
    description: "100% pure Finger Millet (Ragi) Flour. Packed with calcium and iron, ideal for making healthy ragi mudde, roti, and malt.",
    features: ["Rich in Calcium & Iron", "100% Whole Grain", "Perfect for Ragi Mudde", "Freshly Milled Quality"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "rice-flour",
    name: "Rice Flour",
    category: "Healthy Flours",
    isAvailable: false,
    image: "/products/rice flour.jpeg",
    description: "Finely ground premium white rice flour. Perfect for preparing crispy traditional snacks like chakli, akki rotti, and modaks.",
    features: ["Super Fine Texture", "Gluten-Free Flour", "Ideal for Crispy Snacks", "Pure White Quality"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "gram-flour",
    name: "Gram Flour (Besan)",
    category: "Healthy Flours",
    isAvailable: false,
    image: "/products/gram flour.jpeg",
    description: "100% pure Chana Dal Besan. Gives unmatched aroma and flavor to your pakodas, chillas, and festive besan ladoos.",
    features: ["Pure Chana Dal Flour", "No Added Artificial Colors", "Rich Aroma & Fine Taste", "Perfect for Fritters & Sweets"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "pearl-millet-flour",
    name: "Pearl Millet Flour (Bajra)",
    category: "Healthy Flours",
    isAvailable: false,
    image: "/products/pearl millet flour.jpeg",
    description: "Freshly ground Pearl Millet (Bajra) Flour. Rich in fiber and essential minerals, great for traditional bajra rotis and dosas.",
    features: ["High Fiber Content", "Rich in Iron & Magnesium", "100% Gluten-Free", "Warmth & Energy Booster"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "premium-sona-masuri-rice",
    name: "Premium Sona Masuri Rice",
    category: "Premium Rice",
    isAvailable: false,
    image: "/products/sona masuri rice.jpeg",
    description: "Aromatic and lightweight Premium Sona Masuri Rice. Carefully aged to ensure non-sticky, delicious rice perfect for daily meals.",
    features: ["Carefully Aged Rice", "Lightweight & Aromatic", "Low Starch & Non-Sticky", "Hygienically Packed"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "fit-rice",
    name: "Fit Rice",
    category: "Premium Rice",
    isAvailable: false,
    image: "/products/fit rice.jpeg",
    description: "Specialized low glycemic index rice curated for fitness enthusiasts and diabetic meals. Perfect for healthy rice bowls and fitness diets.",
    features: ["Low Glycemic Index", "Nutrient-Dense Grains", "Ideal for Fitness Bowls", "Weight Management Friendly"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "traditional-red-rice",
    name: "Traditional Red Rice",
    category: "Premium Rice",
    isAvailable: false,
    image: "/products/red rice.jpeg",
    description: "Nutritious and unpolished Traditional Red Rice. Loaded with antioxidants and fiber, ideal for red rice meals, kanji, and dosas.",
    features: ["Unpolished & Whole Grain", "High in Antioxidants", "Rich Earthy Flavor", "Highly Digestible"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "thick-poha",
    name: "Thick Poha",
    category: "Pohas & Millets",
    isAvailable: false,
    image: "/products/thick poha.jpeg",
    description: "Premium quality Thick Flattened Rice (Poha). Ideal for preparing traditional Kanda Poha, Vegetable Poha, and crispy cutlets.",
    features: ["100% Sortex Cleansed", "Uniform Thickness", "Retains Shape When Soaked", "Quick & Nutritious Breakfast"],
    packSizes: ["500g", "1kg"]
  },
  {
    id: "thin-poha",
    name: "Thin Poha",
    category: "Pohas & Millets",
    isAvailable: false,
    image: "/products/thin poha.jpeg",
    description: "Delicate and paper-thin Flattened Rice (Poha). Perfect for making quick sweet poha, dahi poha, and crunchy poha mixture.",
    features: ["Super Light & Paper Thin", "No Soaking Required", "Ideal for Tea-time Chivda", "Fresh & Hygenic Processing"],
    packSizes: ["500g", "1kg"]
  }
];

export const PRODUCT_RECIPES: Record<string, Recipe[]> = {
  "premium-idly-rava": [
    {
      name: "Idli",
      description: "Soft, spongy, and fluffy steamed rice cakes made from premium idly rava. Serve hot with coconut chutney and sambar.",
      image: "idli.png"
    },
    {
      name: "Dosa",
      description: "Crispy and golden thin crepes made from fermented idly rava batter. Perfectly paired with spicy potato masala.",
      image: "dosa.png"
    },
    {
      name: "Uthappam",
      description: "Thick savory pancakes topped with finely chopped onions, green chilies, and fresh coriander.",
      image: "uttappam.png"
    },
    {
      name: "Paniyaram",
      description: "Spiced dumpling balls cooked in a special paniyaram pan, crispy on the outside and soft on the inside.",
      image: "paddu.png"
    },
    {
      name: "Mini Idli",
      description: "Bite-sized baby idlis soaked in hot ghee and sambar, a favorite among kids and adults alike.",
      image: "mini idli.png"
    },
    {
      name: "Kanchipuram Idli",
      description: "Traditional spiced idlis flavored with cumin, pepper, ginger powder, curry leaves, and cashews.",
      image: "kanchipuram idli.png"
    }
  ],
  "bombay-suji": [
    {
      name: "Upma",
      description: "A comforting breakfast dish made by cooking Bombay suji with tempered spices, onions, and vegetables.",
      image: "upma.png"
    },
    {
      name: "Rava Dosa",
      description: "Instant, thin, and lacy crispy dosas made with a batter of Bombay suji, rice flour, and curd.",
      image: "rava dosa.png"
    },
    {
      name: "Kesari Bath",
      description: "A classic sweet dish made from Bombay suji roasted in ghee, flavored with cardamom, saffron, and loaded with nuts.",
      image: "kesar bath.png"
    },
    {
      name: "Suji Halwa",
      description: "Rich and delicious semolina pudding cooked in ghee, milk, and sugar, served during festivals and pujas.",
      image: "suji halwa.png"
    },
    {
      name: "Khara Bath",
      description: "Karnataka style spicy upma seasoned with vangi bath powder, ghee, cashew nuts, and fresh peas.",
      image: "upma.png"
    },
    {
      name: "Rava Idli",
      description: "Quick steamed cakes made with yogurt-fermented suji, mustard seeds, curry leaves, and grated carrots.",
      image: "rava dosa.png"
    }
  ],
  "bansi-suji": [
    {
      name: "Sheera",
      description: "Traditional durum wheat semolina sweet cooked with milk, ghee, bananas, and dry fruits.",
      image: "sheera.png"
    },
    {
      name: "Suji Ladoo",
      description: "Delectable sweet balls made of roasted bansi suji, sugar, cardamom, and pure ghee.",
      image: "laddu.png"
    },
    {
      name: "Upma",
      description: "Textural and wholesome breakfast upma made with coarse bansi suji and roasted lentils.",
      image: "sheera.png"
    },
    {
      name: "Halwa",
      description: "A slow-cooked golden semolina halwa with rich aroma and soft melt-in-the-mouth texture.",
      image: "halwa.png"
    },
    {
      name: "Pancakes",
      description: "Healthy semolina pancakes made with bansi suji, yogurt, and sweet cardamom flavoring.",
      image: "pan cakes.png"
    },
    {
      name: "Kesari",
      description: "Golden orange semolina sweet cooked to a soft gelatinous texture with pure ghee and saffron.",
      image: "sheera.png"
    }
  ],
  "little-millet-idli-rava": [
    {
      name: "Millet Appe",
      description: "Crispy and healthy millet dumpling balls cooked in a paniyaram pan with tempered spices.",
      image: "millet appe.png"
    },
    {
      name: "Millet Dosa",
      description: "Thin and crispy high-fiber crepes prepared with fermented little millet rava batter.",
      image: "millet dosa.png"
    },
    {
      name: "Millet Idli",
      description: "Healthy, soft, and nutritious steamed cakes made from stone-ground little millet idli rava.",
      image: "millet idli.png"
    },
    {
      name: "Millet Mini Idli",
      description: "Tiny button idlis prepared using little millet rava, served with ghee and sambar.",
      image: "millet mini idli.png"
    },
    {
      name: "Millet Paniyaram",
      description: "Savory round dumplings loaded with onions, carrots, and green chilies.",
      image: "millet paniyaram.png"
    },
    {
      name: "Millet Uthappam",
      description: "Thick and fluffy millet pancakes topped with tomatoes, onions, and curry leaves.",
      image: "millet uthappam.png"
    }
  ],
  "ragi-flour": [
    {
      name: "Ragi Mudde",
      description: "Authentic Karnataka style nutritious finger millet balls, eaten hot with spicy saaru or sambar.",
      image: "ragi mudde.png"
    },
    {
      name: "Ragi Dosa",
      description: "Crispy, healthy crepes made with a fermented batter of ragi flour and urad dal.",
      image: "ragi dosa.png"
    },
    {
      name: "Ragi Rotti",
      description: "Thick, flavorful flatbreads made with ragi flour, onions, green chilies, and dill leaves.",
      image: "ragi roti.png"
    },
    {
      name: "Ragi Malt",
      description: "A healthy energy drink (Ragi Java) made by boiling ragi flour with milk/water and jaggery.",
      image: "ragi java.png"
    },
    {
      name: "Ragi Idli",
      description: "Soft, iron-rich steamed cakes made with a healthy blend of ragi flour and idli batter.",
      image: "ragi idli.png"
    },
    {
      name: "Ragi Pancake",
      description: "Fluffy breakfast pancakes made with ragi flour, bananas, and a drizzle of honey.",
      image: "ragi dosa.png"
    }
  ],
  "rice-flour": [
    {
      name: "Chakli",
      description: "A crunchy, spiral-shaped savory snack made with rice flour, butter, and cumin seeds, fried to golden perfection.",
      image: "chakli.png"
    },
    {
      name: "Akki Rotti",
      description: "Traditional spicy rice flour flatbread flattened directly onto the pan, flavored with dill leaves and onions.",
      image: "akki rotti.png"
    },
    {
      name: "Modak",
      description: "Steamed sweet dumplings stuffed with coconut and jaggery, a festive delicacy prepared using fine rice flour.",
      image: "modak.png"
    },
    {
      name: "Rice Dosa",
      description: "Instant rice flour crepes (Neer Dosa style) that are paper-thin, soft, and melt in your mouth.",
      image: "rice dosa.png"
    },
    {
      name: "Murukku",
      description: "Deep-fried crispy rice flour snack made with sesame seeds and ajwain, popular during festivals.",
      image: "murukku.png"
    },
    {
      name: "Puttu",
      description: "Steamed cylinders of rice flour layered with grated coconut, served with banana or kadala curry.",
      image: "puttu.png"
    }
  ],
  "gram-flour": [
    {
      name: "Pakoda",
      description: "Crispy onion fritters made by coating sliced onions in spiced besan (gram flour) batter and deep frying.",
      image: "pakoda.png"
    },
    {
      name: "Chilla",
      description: "A quick, savory pancake made with gram flour, spices, herbs, and finely chopped veggies.",
      image: "chilla.png"
    },
    {
      name: "Mysore Pak",
      description: "A legendary royal sweet made by roasting besan in huge amounts of pure ghee and sugar syrup.",
      image: "mysore pak.png"
    },
    {
      name: "Boondi",
      description: "Tiny, crispy fried gram flour balls, either served sweet or mixed with spices to make a savory mixture.",
      image: "boondi.png"
    },
    {
      name: "Sev",
      description: "Crispy, spiced gram flour noodles fried to golden perfection, a popular tea-time snack.",
      image: "sev.png"
    },
    {
      name: "Besan Ladoo",
      description: "Traditional sweet balls made by roasting gram flour in ghee, flavored with cardamom and sugar.",
      image: "besan ladoo.png"
    }
  ],
  "pearl-millet-flour": [
    {
      name: "Bajra Roti",
      description: "Rustic flatbread made from bajra (pearl millet) flour, cooked on a clay tawa and smeared with white butter.",
      image: "bajra roti.png"
    },
    {
      name: "Bajra Khichdi",
      description: "A warming and wholesome winter porridge made with crushed bajra, moong dal, ghee, and simple spices.",
      image: "bajra khichdi.png"
    },
    {
      name: "Bajra Dosa",
      description: "Crispy and healthy instant dosas prepared using bajra flour, ginger-garlic paste, and green chilies.",
      image: "bajra dosa.png"
    },
    {
      name: "Bajra Upma",
      description: "A nutritious breakfast dish made by cooking pearl millet flour/semolina with mixed vegetables.",
      image: "bajra upma.png"
    },
    {
      name: "Thepla",
      description: "Spiced flatbreads made with bajra flour, whole wheat flour, yogurt, and fresh fenugreek (methi) leaves.",
      image: "thepla.png"
    },
    {
      name: "Bajra Pancake",
      description: "Healthy savory pancakes made with bajra flour, grated vegetables, and yogurt.",
      image: "bajra pancake.png"
    }
  ],
  "premium-sona-masuri-rice": [
    {
      name: "Steamed Rice",
      description: "Perfectly cooked, fluffy Sona Masuri rice, serving as the comforting base for all Indian curries.",
      image: "steamed rice.png"
    },
    {
      name: "Lemon Rice",
      description: "A tangy and crunchy South Indian dish made with cooked rice, lemon juice, tempered mustard seeds, and roasted peanuts.",
      image: "lemon rice.png"
    },
    {
      name: "Puliyogare",
      description: "Traditional tamarind rice cooked with a spiced tamarind paste, sesame oil, dry red chilies, and peanuts.",
      image: "puliyogare.png"
    },
    {
      name: "Pulao",
      description: "Fragrant rice cooked with mild spices, ghee, and a medley of seasonal vegetables like peas, carrots, and beans.",
      image: "pulao1.png"
    },
    {
      name: "Curd Rice",
      description: "A soothing dish made by mixing cooked rice with fresh yogurt, tempered with curry leaves and mustard seeds.",
      image: "curd rice.png"
    },
    {
      name: "Bisi Bele Bath",
      description: "A rich, spicy meal from Karnataka made with rice, lentils, vegetables, ghee, and a unique bisi bele bath spice blend.",
      image: "bisi bele bath.png"
    }
  ],
  "fit-rice": [
    {
      name: "Rice Bowl",
      description: "A healthy meal bowl featuring fit rice topped with grilled paneer, sauteed vegetables, and a light dressing.",
      image: "rice bowl.png"
    },
    {
      name: "Vegetable Rice Pulao",
      description: "A low glycemic index, aromatic vegetable pulao made with fit rice, cooked with minimal ghee and tossed with fresh garden vegetables.",
      image: "vegetable rice pulao.png"
    },
    {
      name: "Fitness Bowl",
      description: "A balanced meal bowl containing fit rice, boiled lentils, high-protein vegetables, and avocado.",
      image: "fitness bowl.png"
    },
    {
      name: "Diabetic Meal",
      description: "A low glycemic meal designed for diabetics, featuring fit rice, fiber-rich vegetables, and dal.",
      image: "diabetic meal.png"
    },
    {
      name: "Protein Bowl",
      description: "A power packed post-workout bowl with fit rice, grilled tofu/paneer, chickpeas, and broccoli.",
      image: "protein bowl.png"
    }
  ],
  "traditional-red-rice": [
    {
      name: "Red Rice Meal",
      description: "Wholesome red rice served with traditional lentil sambar and vegetable stir-fries (palya).",
      image: "red rice meal.png"
    },
    {
      name: "Kanji",
      description: "A comforting red rice gruel cooked with coconut milk, garlic, and fenugreek seeds, perfect for digestion.",
      image: "kanji.png"
    },
    {
      name: "Pulao",
      description: "A rustic, nutty pulao prepared with red rice, tossed with roasted pine nuts and herbs.",
      image: "pulao.png"
    },
    {
      name: "Idli",
      description: "Spongy, red-tinged healthy idlis made by fermenting red rice and black gram.",
      image: "idli.png"
    },
    {
      name: "Dosa",
      description: "Crispy and nutty dosas made from fiber-rich red rice batter, best enjoyed with tomato chutney.",
      image: "dosa.png"
    },
    {
      name: "Kheer",
      description: "A decadent, slow-cooked red rice pudding sweet sweetened with jaggery and coconut milk.",
      image: "kheer.png"
    }
  ],
  "thick-poha": [
    {
      name: "Kanda Poha",
      description: "A popular Maharashtrian breakfast made of thick poha sautéed with onions, potatoes, peanuts, and turmeric.",
      image: "kanda poha.png"
    },
    {
      name: "Vegetable Poha",
      description: "Wholesome flattened rice cooked with chopped carrots, green peas, beans, and tempered spices.",
      image: "vegetable poha.png"
    },
    {
      name: "Masala Poha",
      description: "Spicy and tangy poha cooked with a special masala, tomatoes, and topped with fresh sev.",
      image: "masala poha.png"
    },
    {
      name: "Cutlet",
      description: "Crispy fried cutlets made from a mixture of mashed potatoes, thick poha, vegetables, and spices.",
      image: "cutlet.png"
    },
    {
      name: "Chivda",
      description: "A crunchy snack made by roasting thick poha with peanuts, cashews, roasted gram dal, and curry leaves.",
      image: "chivda.png"
    },
    {
      name: "Poha Upma",
      description: "An easy breakfast dish prepared by cooking soaked thick poha with tempered mustard seeds and green chilies.",
      image: "poha upma.png"
    }
  ],
  "thin-poha": [
    {
      name: "Avalakki",
      description: "Quick Karnataka-style seasoned thin poha seasoned with mustard seeds, green chilies, and coconut.",
      image: "avalakki1.png"
    },
    {
      name: "Sweet Poha",
      description: "Instant sweet recipe made by tossing thin poha with grated jaggery, fresh coconut, and cardamom.",
      image: "sweet poha.png"
    },
    {
      name: "Dahi Poha",
      description: "A cooling and gut-friendly breakfast made by mixing thin poha with curd, pomegranate seeds, and mild tempering.",
      image: "dahi poha.png"
    },
    {
      name: "Lemon Poha",
      description: "A light breakfast dish of thin poha tossed with lemon juice, turmeric, and roasted peanuts.",
      image: "lemon poha.png"
    },
    {
      name: "Poha Mixture",
      description: "A crunchy, spiced mixture of toasted thin poha, raisins, peanuts, and dry coconut slices.",
      image: "poha mixture.png"
    },
    {
      name: "Coconut Poha",
      description: "A fragrant dish where thin poha is seasoned with plenty of freshly grated coconut, mustard seeds, and curry leaves.",
      image: "coconut poha.png"
    }
  ]
};

export const PRODUCT_SLUG_MAP: Record<string, { id: string; folderName: string }> = {
  "premium-idly-rava": { id: "premium-idly-rava", folderName: "idli rawa" },
  "idly-rava": { id: "premium-idly-rava", folderName: "idli rawa" },
  "bombay-suji": { id: "bombay-suji", folderName: "bombay suji" },
  "bansi-suji": { id: "bansi-suji", folderName: "bansi suji" },
  "little-millet-idli-rava": { id: "little-millet-idli-rava", folderName: "little millet idli rava" },
  "little-millet-idli-rawa": { id: "little-millet-idli-rava", folderName: "little millet idli rava" },
  "ragi-flour": { id: "ragi-flour", folderName: "ragi flaour" },
  "rice-flour": { id: "rice-flour", folderName: "rice flour" },
  "gram-flour-besan": { id: "gram-flour", folderName: "gram flour" },
  "gram-flour": { id: "gram-flour", folderName: "gram flour" },
  "pearl-millet-flour-bajra": { id: "pearl-millet-flour", folderName: "pearl millet flour" },
  "pearl-millet-flour": { id: "pearl-millet-flour", folderName: "pearl millet flour" },
  "premium-sona-masuri-rice": { id: "premium-sona-masuri-rice", folderName: "sona masuri rice" },
  "sona-masuri-rice": { id: "premium-sona-masuri-rice", folderName: "sona masuri rice" },
  "fit-rice": { id: "fit-rice", folderName: "fit rice" },
  "traditional-red-rice": { id: "traditional-red-rice", folderName: "red rice" },
  "red-rice": { id: "traditional-red-rice", folderName: "red rice" },
  "thick-poha": { id: "thick-poha", folderName: "thick poha" },
  "thin-poha": { id: "thin-poha", folderName: "thin poha" }
};

export function getProductSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
