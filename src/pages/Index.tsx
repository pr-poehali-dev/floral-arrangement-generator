import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Flower {
  id: string;
  name: string;
  category: 'focal' | 'secondary' | 'addition';
  colors: { name: string; hex: string }[];
  image: string;
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
      { name: 'Красная', hex: '#DC143C' },
      { name: 'Розовая', hex: '#FFB6C1' },
      { name: 'Белая', hex: '#FFFFFF' },
      { name: 'Желтая', hex: '#FFD700' },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 'peony',
    name: 'Пион',
    category: 'focal',
    colors: [
      { name: 'Розовый', hex: '#FFC0CB' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Коралловый', hex: '#FF6B6B' },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 'tulip',
    name: 'Тюльпан',
    category: 'focal',
    colors: [
      { name: 'Красный', hex: '#E63946' },
      { name: 'Желтый', hex: '#FFD60A' },
      { name: 'Розовый', hex: '#FF69B4' },
      { name: 'Фиолетовый', hex: '#9D4EDD' },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 'gypsophila',
    name: 'Гипсофила',
    category: 'secondary',
    colors: [
      { name: 'Белая', hex: '#FFFFFF' },
      { name: 'Розовая', hex: '#FFE4E6' },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 'limonium',
    name: 'Лимониум',
    category: 'secondary',
    colors: [
      { name: 'Фиолетовый', hex: '#9D4EDD' },
      { name: 'Розовый', hex: '#FFB3C6' },
      { name: 'Белый', hex: '#F8F9FA' },
    ],
    image: '/placeholder.svg',
  },
  {
    id: 'eucalyptus',
    name: 'Эвкалипт',
    category: 'addition',
    colors: [{ name: 'Зеленый', hex: '#90BE6D' }],
    image: '/placeholder.svg',
  },
  {
    id: 'ruscus',
    name: 'Рускус',
    category: 'addition',
    colors: [{ name: 'Зеленый', hex: '#52B788' }],
    image: '/placeholder.svg',
  },
  {
    id: 'wheat',
    name: 'Пшеница',
    category: 'addition',
    colors: [{ name: 'Золотой', hex: '#F4A261' }],
    image: '/placeholder.svg',
  },
];

const colorPalettes = [
  { name: 'Романтика', colors: ['#FFB6C1', '#FFFFFF', '#FFE4E6', '#90BE6D'] },
  { name: 'Страсть', colors: ['#DC143C', '#E63946', '#FFD700', '#52B788'] },
  { name: 'Нежность', colors: ['#FFC0CB', '#FFFFFF', '#FFE4E6', '#F8F9FA'] },
  { name: 'Лаванда', colors: ['#9D4EDD', '#FFB3C6', '#FFFFFF', '#90BE6D'] },
  { name: 'Солнечная', colors: ['#FFD60A', '#FFD700', '#F4A261', '#90BE6D'] },
];

export default function Index() {
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [activeTab, setActiveTab] = useState('focal');

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

  const generateBouquet = () => {
    const circles: { x: number; y: number; radius: number; color: string }[] = [];
    const centerX = 200;
    const centerY = 200;
    const bouquetRadius = 160;

    selectedFlowers.forEach(({ flowerId, color, count }) => {
      const flower = flowerData.find((f) => f.id === flowerId);
      const radius = flower?.category === 'focal' ? 24 : flower?.category === 'secondary' ? 14 : 8;

      for (let i = 0; i < count; i++) {
        let attempts = 0;
        let placed = false;

        while (attempts < 100 && !placed) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * bouquetRadius * 0.8;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;

          const distanceFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );

          if (distanceFromCenter + radius <= bouquetRadius) {
            const overlaps = circles.some((circle) => {
              const dist = Math.sqrt(
                Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2)
              );
              return dist < circle.radius + radius + 2;
            });

            if (!overlaps) {
              circles.push({ x, y, radius, color });
              placed = true;
            }
          }

          attempts++;
        }
      }
    });

    return circles;
  };

  const bouquetCircles = selectedFlowers.length > 0 ? generateBouquet() : [];

  const categoryNames = {
    focal: 'Фокальные',
    secondary: 'Второстепенные',
    addition: 'Дополнения',
  };

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
                    <TabsContent key={category} value={category} className="space-y-4">
                      {flowerData
                        .filter((f) => f.category === category)
                        .map((flower) => (
                          <Card key={flower.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                                  {category === 'focal' && '🌹'}
                                  {category === 'secondary' && '✨'}
                                  {category === 'addition' && '🌿'}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-lg mb-2">{flower.name}</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {flower.colors.map((colorOption) => (
                                      <Button
                                        key={colorOption.name}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => addFlower(flower.id, colorOption.hex)}
                                        className="text-xs"
                                        style={{
                                          borderColor: colorOption.hex,
                                          backgroundColor: `${colorOption.hex}15`,
                                        }}
                                      >
                                        <div
                                          className="w-3 h-3 rounded-full mr-1.5 border border-gray-300"
                                          style={{ backgroundColor: colorOption.hex }}
                                        />
                                        {colorOption.name}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Palette" size={24} className="text-purple-500" />
                  Рекомендуемые палитры
                </h2>
                <div className="space-y-3">
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

                        {bouquetCircles.map((circle, i) => (
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
                      {selectedFlowers.map(({ flowerId, color, count }) => {
                        const flower = flowerData.find((f) => f.id === flowerId);
                        const colorName =
                          flower?.colors.find((c) => c.hex === color)?.name || '';

                        return (
                          <div
                            key={`${flowerId}-${color}`}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                              />
                              <span className="text-sm">
                                {flower?.name} {colorName}
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
