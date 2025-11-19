import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface FlowerColor {
  name: string;
  hex: string;
  image: string;
}

interface Flower {
  id: string;
  name: string;
  category: 'focal' | 'secondary' | 'addition';
  colors: FlowerColor[];
}

interface SelectedFlower {
  flowerId: string;
  color: string;
  count: number;
}

const flowerData: Flower[] = [
  {
    id: 'rose',
    name: 'Роза',
    category: 'focal',
    colors: [
      { name: 'Красная', hex: '#DC143C', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/6990bd6c-2ee7-4952-b2df-ff9fc7e6448b.jpg' },
      { name: 'Розовая', hex: '#FFB6C1', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/98d07761-5e48-411b-85fe-c270a26d115d.jpg' },
      { name: 'Белая', hex: '#FFFFFF', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/a98f839d-2740-40c2-aa0b-7f37e5c33686.jpg' },
      { name: 'Желтая', hex: '#FFD700', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/dcbf5f66-394f-45e5-a6a7-683d1a6c4795.jpg' },
    ],
  },
  {
    id: 'peony',
    name: 'Пион',
    category: 'focal',
    colors: [
      { name: 'Розовый', hex: '#FFC0CB', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/f5bfa81c-0372-4c70-96b7-563fe6ce90af.jpg' },
      { name: 'Белый', hex: '#FFFFFF', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/c996dee8-e1d4-4c9a-8444-d72eb717723a.jpg' },
      { name: 'Коралловый', hex: '#FF6B6B', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/03e160f1-0771-436f-85aa-426b881ed52c.jpg' },
    ],
  },
  {
    id: 'tulip',
    name: 'Тюльпан',
    category: 'focal',
    colors: [
      { name: 'Красный', hex: '#E63946', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/4f2482f7-a6bc-4529-9a84-231f6d1471b5.jpg' },
      { name: 'Желтый', hex: '#FFD60A', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/ecb3557f-8f44-4c88-8c34-b082202d73de.jpg' },
      { name: 'Розовый', hex: '#FF69B4', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/c5aea366-1c13-4f5a-bd2d-1a302351291a.jpg' },
      { name: 'Фиолетовый', hex: '#9D4EDD', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/284ba033-7662-47e7-bcc5-0228e8554f20.jpg' },
    ],
  },
  {
    id: 'sunflower',
    name: 'Подсолнух',
    category: 'focal',
    colors: [
      { name: 'Желтый', hex: '#FFA500', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/40c0cbda-8848-4b77-ab85-8a2fd96ec629.jpg' },
    ],
  },
  {
    id: 'hydrangea',
    name: 'Гортензия',
    category: 'focal',
    colors: [
      { name: 'Фиолетовая', hex: '#B19CD9', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/992cc3e3-858b-4983-ab95-69c51d1d8ff1.jpg' },
      { name: 'Синяя', hex: '#7CB9E8', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/472454b8-9c1e-446b-a006-195c0907c500.jpg' },
    ],
  },
  {
    id: 'carnation',
    name: 'Гвоздика',
    category: 'focal',
    colors: [
      { name: 'Розовая', hex: '#FFB6D9', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/0db71c57-bf70-41dc-b22f-320ccadebac3.jpg' },
    ],
  },
  {
    id: 'orchid',
    name: 'Орхидея',
    category: 'focal',
    colors: [
      { name: 'Белая', hex: '#FAFAFA', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/6e503095-6fd9-4b2a-b0d7-74eb34d02884.jpg' },
    ],
  },
  {
    id: 'gypsophila',
    name: 'Гипсофила',
    category: 'secondary',
    colors: [
      { name: 'Белая', hex: '#FFFFFF', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/c6f9b711-dda5-4eeb-af1c-499c928ea9a7.jpg' },
      { name: 'Розовая', hex: '#FFE4E6', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/ba0724b7-a3fd-4ea7-a68e-5b4e4d27d3fa.jpg' },
    ],
  },
  {
    id: 'limonium',
    name: 'Лимониум',
    category: 'secondary',
    colors: [
      { name: 'Фиолетовый', hex: '#9D4EDD', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/ed4e645b-f739-4671-a725-1bf20be428f9.jpg' },
      { name: 'Розовый', hex: '#FFB3C6', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/530b36eb-11f0-40d6-9924-229f78b4cdbe.jpg' },
      { name: 'Белый', hex: '#F8F9FA', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/2b000ea5-722c-40e1-8fc8-731d766e264c.jpg' },
    ],
  },
  {
    id: 'eucalyptus',
    name: 'Эвкалипт',
    category: 'addition',
    colors: [{ name: 'Зеленый', hex: '#90BE6D', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/0fbbf048-69bb-4a42-b164-6a2944835c1f.jpg' }],
  },
  {
    id: 'ruscus',
    name: 'Рускус',
    category: 'addition',
    colors: [{ name: 'Зеленый', hex: '#52B788', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/2c838796-907c-46e2-b88f-092988c30980.jpg' }],
  },
  {
    id: 'wheat',
    name: 'Пшеница',
    category: 'addition',
    colors: [{ name: 'Золотой', hex: '#F4A261', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/7c859fab-a3f4-4b1d-8b74-336e63d57d0d.jpg' }],
  },
  {
    id: 'lavender',
    name: 'Лаванда',
    category: 'addition',
    colors: [{ name: 'Фиолетовая', hex: '#9D84B7', image: 'https://cdn.poehali.dev/projects/5e404e1a-ace1-4248-8f70-7af6b1e8b640/files/4a4a52cc-7ef0-435b-a322-ecf87ef2264c.jpg' }],
  },
];

const colorPalettes = [
  { name: 'Романтика', colors: ['#FFB6C1', '#FFFFFF', '#FFE4E6', '#90BE6D'] },
  { name: 'Страсть', colors: ['#DC143C', '#E63946', '#FFD700', '#52B788'] },
  { name: 'Нежность', colors: ['#FFC0CB', '#FFFFFF', '#FFE4E6', '#F8F9FA'] },
  { name: 'Лаванда', colors: ['#9D4EDD', '#FFB3C6', '#FFFFFF', '#90BE6D'] },
  { name: 'Солнечная', colors: ['#FFD60A', '#FFD700', '#F4A261', '#90BE6D'] },
  { name: 'Океан', colors: ['#7CB9E8', '#B19CD9', '#FFFFFF', '#52B788'] },
];

export default function Index() {
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [activeTab, setActiveTab] = useState('focal');
  const [bouquetVariant, setBouquetVariant] = useState(0);

  const addFlower = (flowerId: string, color: string) => {
    const existing = selectedFlowers.find(
      (f) => f.flowerId === flowerId && f.color === color
    );

    if (existing) {
      setSelectedFlowers(
        selectedFlowers.map((f) =>
          f.flowerId === flowerId && f.color === color
            ? { ...f, count: f.count + 1 }
            : f
        )
      );
    } else {
      setSelectedFlowers([...selectedFlowers, { flowerId, color, count: 1 }]);
    }
  };

  const removeFlower = (flowerId: string, color: string) => {
    const existing = selectedFlowers.find(
      (f) => f.flowerId === flowerId && f.color === color
    );

    if (existing && existing.count > 1) {
      setSelectedFlowers(
        selectedFlowers.map((f) =>
          f.flowerId === flowerId && f.color === color
            ? { ...f, count: f.count - 1 }
            : f
        )
      );
    } else {
      setSelectedFlowers(
        selectedFlowers.filter(
          (f) => !(f.flowerId === flowerId && f.color === color)
        )
      );
    }
  };

  const generateBouquetSpiral = (seed: number) => {
    const circles: { x: number; y: number; radius: number; color: string }[] = [];
    const centerX = 200;
    const centerY = 200;
    const bouquetRadius = 160;

    const allFlowers: { radius: number; color: string; category: string }[] = [];
    selectedFlowers.forEach(({ flowerId, color, count }) => {
      const flower = flowerData.find((f) => f.id === flowerId);
      const radius = flower?.category === 'focal' ? 24 : flower?.category === 'secondary' ? 14 : 8;
      for (let i = 0; i < count; i++) {
        allFlowers.push({ radius, color, category: flower?.category || 'focal' });
      }
    });

    allFlowers.sort((a, b) => {
      if (a.category === 'focal' && b.category !== 'focal') return -1;
      if (a.category !== 'focal' && b.category === 'focal') return 1;
      if (a.category === 'secondary' && b.category === 'addition') return -1;
      if (a.category === 'addition' && b.category === 'secondary') return 1;
      return 0;
    });

    let angle = seed * 137.5;
    let spiralRadius = 0;
    const spiralStep = 8;

    allFlowers.forEach((flower, index) => {
      const radian = (angle * Math.PI) / 180;
      
      if (flower.category === 'focal') {
        spiralRadius = index * spiralStep;
      } else if (flower.category === 'secondary') {
        spiralRadius = (index * spiralStep) + 5;
      } else {
        spiralRadius = Math.min((index * spiralStep) + 10, bouquetRadius - flower.radius - 10);
      }

      const x = centerX + Math.cos(radian) * Math.min(spiralRadius, bouquetRadius - flower.radius - 10);
      const y = centerY + Math.sin(radian) * Math.min(spiralRadius, bouquetRadius - flower.radius - 10);

      circles.push({ x, y, radius: flower.radius, color: flower.color });

      angle += 137.5 + (seed * 10);
    });

    return circles;
  };

  const bouquetVariants = selectedFlowers.length > 0 
    ? [generateBouquetSpiral(0), generateBouquetSpiral(1), generateBouquetSpiral(2)]
    : [[], [], []];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <span className="animate-float">🌸</span>
            Цветник
          </h1>
          <p className="text-lg text-gray-600">
            Создавайте идеальные букеты с помощью AI
          </p>
        </header>

        <div className="flex gap-4 mb-6 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg">
                <Icon name="Palette" size={20} className="mr-2" />
                Палитры цветов
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Рекомендуемые палитры</SheetTitle>
              </SheetHeader>
              <div className="space-y-3 mt-6">
                {colorPalettes.map((palette) => (
                  <div
                    key={palette.name}
                    className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{palette.name}</span>
                      <div className="flex gap-1.5">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="shadow-lg animate-scale-in">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Flower2" size={24} className="text-pink-500" />
                  Выберите цветы
                </h2>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="focal">Фокальные</TabsTrigger>
                    <TabsTrigger value="secondary">Второстепенные</TabsTrigger>
                    <TabsTrigger value="addition">Дополнения</TabsTrigger>
                  </TabsList>

                  {(['focal', 'secondary', 'addition'] as const).map((category) => (
                    <TabsContent key={category} value={category} className="space-y-4 max-h-[600px] overflow-y-auto">
                      {flowerData
                        .filter((f) => f.category === category)
                        .map((flower) => (
                          <Card key={flower.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <h3 className="font-medium text-lg mb-3">{flower.name}</h3>
                              <div className="grid grid-cols-2 gap-3">
                                {flower.colors.map((colorOption) => (
                                  <div
                                    key={colorOption.name}
                                    className="relative group cursor-pointer"
                                    onClick={() => addFlower(flower.id, colorOption.hex)}
                                  >
                                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-pink-400 transition-colors">
                                      <img
                                        src={colorOption.image}
                                        alt={`${flower.name} ${colorOption.name}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                      />
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                      <span className="text-xs text-gray-600">{colorOption.name}</span>
                                      <div
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: colorOption.hex }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-yellow-500" />
                  Ваш букет
                </h2>

                {selectedFlowers.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <Icon name="Flower" size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Выберите цветы для создания букета</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      {[0, 1, 2].map((variantIndex) => (
                        <div
                          key={variantIndex}
                          onClick={() => setBouquetVariant(variantIndex)}
                          className={`flex-1 cursor-pointer p-2 rounded-lg border-2 transition-all ${
                            bouquetVariant === variantIndex
                              ? 'border-pink-400 bg-pink-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <svg width="100%" height="120" viewBox="0 0 400 400" className="drop-shadow-sm">
                            <circle
                              cx="200"
                              cy="200"
                              r="160"
                              fill="none"
                              stroke="#E5DEFF"
                              strokeWidth="1"
                              strokeDasharray="4 4"
                            />
                            {bouquetVariants[variantIndex].map((circle, i) => (
                              <circle
                                key={i}
                                cx={circle.x}
                                cy={circle.y}
                                r={circle.radius}
                                fill={circle.color}
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                style={{
                                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                                }}
                              />
                            ))}
                          </svg>
                          <p className="text-center text-xs text-gray-600 mt-1">
                            Вариант {variantIndex + 1}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <svg width="400" height="400" className="drop-shadow-lg">
                        <circle
                          cx="200"
                          cy="200"
                          r="160"
                          fill="none"
                          stroke="#E5DEFF"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        {bouquetVariants[bouquetVariant].map((circle, i) => (
                          <circle
                            key={i}
                            cx={circle.x}
                            cy={circle.y}
                            r={circle.radius}
                            fill={circle.color}
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            className="transition-all duration-300"
                            style={{
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                            }}
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-sm text-gray-600 mb-3">Состав букета:</h3>
                      <div className="max-h-[200px] overflow-y-auto space-y-2">
                        {selectedFlowers.map(({ flowerId, color, count }) => {
                          const flower = flowerData.find((f) => f.id === flowerId);
                          const flowerColor = flower?.colors.find((c) => c.hex === color);

                          return (
                            <div
                              key={`${flowerId}-${color}`}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={flowerColor?.image}
                                  alt={flower?.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <span className="text-sm">
                                  {flower?.name} {flowerColor?.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFlower(flowerId, color)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <Badge variant="secondary" className="min-w-[2rem] justify-center">
                                  {count}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addFlower(flowerId, color)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setSelectedFlowers([])}
                      variant="outline"
                    >
                      <Icon name="RotateCcw" size={18} className="mr-2" />
                      Начать заново
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
