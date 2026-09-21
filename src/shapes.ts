import { Shape } from "./abstract.js";
import type { IDrawable, ITransformable } from "./interfaces.js";

const generateId = (prefix: string, counter: number): string =>
  `${prefix}-${++counter}-${Date.now()}`;

export class Circle extends Shape implements IDrawable, ITransformable {
  private radius: number;
  private center: { x: number; y: number };
  constructor(radius: number, x: number = 0, y: number = 0) {
    super("Circle", generateId("circle", Shape.getTotalShapes()));
    if (radius <= 0) throw new Error("Radius must be positive.");

    this.radius = radius;
    this.center = { x, y };
  }

  getRadius(): number {
    return this.radius;
  }
  getCenter(): { x: number; y: number } {
    // لتجنب مشاكل التمرير بالمرجع نقوم بالتمرير بالقيمة
    return { ...this.center };
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
  scale(factor: number): number {
    if (factor <= 0) throw new Error("Scale factor must be positive.");
    this.radius = this.radius * factor;
    return this.radius;
  }

  getDiameter(): number {
    return this.radius * 2;
  }
  getCircumference(): number {
    return this.getPerimeter();
  }

  // All Points on a circle circumference with a radius of r must satisfy the equation
  // (x_0 - x)^2 + (y_0 - y)^2 = r^2
  // Thus to verify if points x_0 and y_0 are inside the circle we simply check if less than or equal
  isPointInside(px: number, py: number): boolean {
    const dx = px - this.center.x;
    const dy = py - this.center.y;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
  // أصغر مستطيل يستطيع احتواء الشكل وفي حالة الدائرة يكون دائما مربع بضلع يساوي ضعف القطر
  getBoundingBox(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.center.x - this.radius,
      y: this.center.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }
  rotate(degree: number): void {
    // متناظرة دورانيا
  }
  // الموقع هو نفسه المركز في الدائرة
  getPosition(): { x: number; y: number } {
    return { ...this.center };
  }
}
export class Rectangle extends Shape implements IDrawable, ITransformable {
  private width: number;
  private height: number;
  private position: { x: number; y: number };

  constructor(width: number, height: number, x: number = 0, y: number = 0) {
    super("Rectangle", generateId("rectangle", Shape.getTotalShapes()));
    if (width <= 0 || height <= 0) {
      throw new Error("Width and height must be positive.");
    }
    this.width = width;
    this.height = height;
    this.position = { x, y };
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
  // الموقع في المستطيل هو المركز هون كمان
  getPosition(): { x: number; y: number } {
    return { ...this.position };
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  scale(factor: number): number {
    if (factor <= 0) throw new Error("Scale factor must be positive.");
    this.width = this.width * factor;
    this.height = this.height * factor;
    return this.getArea();
  }

  isSquare(): boolean {
    return this.width == this.height;
  }
  // قطر المستطيل هو نفسه الوتر لمثلث قائم لأنو زوايا كلها قائمة
  getDiagonal(): number {
    return Math.sqrt(this.width ** 2 + this.height ** 2);
  }
  // هي نسبة العرض إلى الطول
  getAspectRatio(): number {
    return this.width / this.height;
  }

  getBoundingBox(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.width,
      height: this.height,
    };
  }

  rotate(degree: number): void {
    // يلزم أرقع نقاط إحداثيات للرؤوس لحساب الدوران, نحن اعتمدنا على المركز فقط, لذا مثل الدائرة تقريبا لا يمكن حسابه هنا
  }
}

export class Triangle extends Shape implements IDrawable, ITransformable {
  private sides: [number, number, number];
  // عقد الرؤوس , أي إحداثياتهم
  private vertices: { x: number; y: number }[];

  constructor(sideA: number, sideB: number, sideC: number) {
    super("Triangle", generateId("triangle", Shape.getTotalShapes()));

    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
      throw new Error("All sides must be positive.");
    }
    if (
      sideA + sideB <= sideC ||
      sideA + sideC <= sideB ||
      sideB + sideC <= sideA
    ) {
      throw new Error(
        "Invalid triangle: sum of any two sides must exceed the third.",
      );
    }

    this.sides = [sideA, sideB, sideC];
    //  لسهولة   القراءة
    const [a, b, c] = this.sides;
    // النقطة الأولى بشكل كيفي وضعناها في المبدأ
    // النقطة الثانية تبعد عن المبدأ على السينات مسافة ضلع وليكن c
    // let v1 = (0, 0), v2 = (c, 0), v3 = (x ,y) the three vertices
    // if we want to know x and y of v3, 2 conditions must be meet, which are:
    // 1- x^2 + y^2 = a^2
    // 2- (x-c)^2 + y^2 = b^2
    // by re-arranging the terms, y cancels and we can find x with respect to a, b, and c only
    // Thus
    const x = (a * a - b * b + c * c) / (2 * c);
    const y = Math.sqrt(Math.max(0, a * a - x * x));

    this.vertices = [
      { x: 0, y: 0 },
      { x: c, y: 0 },
      { x, y },
    ];
  }
  private get semiPerimeter(): number {
    return this.getPerimeter() / 2;
  }
  // معادلة هيرون لحساب المساحة بدلالة نصف المحيط
  getArea(): number {
    const [a, b, c] = this.sides;
    const s = this.semiPerimeter;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  getPerimeter(): number {
    const [a, b, c] = this.sides;
    return a + b + c;
  }

  // THIS ONE ALSO NEEDS
  scale(factor: number): number {
    const [a, b, c] = this.sides;
    if (factor <= 0) throw new Error("Scale factor must be positive.");
    this.sides = [a * factor, b * factor, c * factor];
    this.vertices = this.vertices.map((v) => ({
      x: v.x * factor,
      y: v.y * factor,
    }));
    return this.getArea();
  }

  getAngles(): { angleA: number; angleB: number; angleC: number } {
    const [a, b, c] = this.sides;
    const radToDeg = (rad: number) => (rad * 180) / Math.PI;
    //  بشكل عام قياس الزاوية بالراديان في أي مثلث هو الفرق بين مجموع مربع الضلعين المجاورين
    //   والضلع المقابلة للزاوية مقسوما على ضعفي ذلك الضلعين
    // وبما أن مجموع الزوايا ثابت الثالثة تحسب بالطرح العادي
    //  from the identity Law of Cosines cos(A) = (b^2 + c^2 - a^2)/2bc
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c));
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c));
    const angleC = Math.PI - angleA - angleB;

    return {
      angleA: radToDeg(angleA),
      angleB: radToDeg(angleB),
      angleC: radToDeg(angleC),
    };
  }

  isEquilateral(): boolean {
    const [a, b, c] = this.sides;
    return a === b && b === c;
  }

  isIsosceles(): boolean {
    const [a, b, c] = this.sides;
    return a === b || b === c || a === c;
  }

  isRightAngled(): boolean {
    const sorted = [...this.sides].toSorted((x, y) => x - y) as [
      number,
      number,
      number,
    ];
    const [a, b, c] = sorted;
    return a * a + b * b == c * c;
  }

  getPosition(): { x: number; y: number } {
    const [v1, v2, v3] = this.vertices as [
      { x: number; y: number },
      { x: number; y: number },
      { x: number; y: number },
    ];
    return {
      x: (v1.x + v2.x + v3.x) / 3,
      y: (v1.y + v2.y + v3.y) / 3,
    };
  }
  getCircumradius(): number {
    const [a, b, c] = this.sides;
    const area = this.getArea();
    if (area === 0) return 0;
    return (a * b * c) / (4 * area);
  }

  getInRadius(): number {
    const area = this.getArea();
    const s = this.semiPerimeter;
    if (s === 0) return 0;
    return area / s;
  }

  getBoundingBox(): { x: number; y: number; width: number; height: number } {
    const xs = this.vertices.map((v) => v.x);
    const ys = this.vertices.map((v) => v.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  rotate(degree: number): void {
    const theta = (degree * Math.PI) / 180;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    // نُدوّر حول المركز الهندسي
    const { x: px, y: py } = this.getPosition();

    this.vertices = this.vertices.map((v) => {
      const dx = v.x - px;
      const dy = v.y - py;
      return {
        x: px + dx * cos - dy * sin,
        y: py + dx * sin + dy * cos,
      };
    });
  }
}
