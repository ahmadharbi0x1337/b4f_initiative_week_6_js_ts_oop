import { Shape } from "./abstract.js";
import type { IDrawable, ITransformable } from "./interfaces.js";

class Circle extends Shape implements IDrawable, ITransformable {
  private radius: number;
  private center: { x: number; y: number };
  constructor(radius: number, x: number, y: number) {
    super(name, id);
    this.radius = radius;
    this.x = this.center.x;
    this.y = this.center.y;
  }

  getRadius(): number {}
  getCenter(): number {}

  getArea(): number {}
  getPerimeter(): number {}
  scale(factor: number): number {}

  getDiameter(): number {}
  getCircumference(): number {}
  isPointInside(px: number, py: number): boolean {}

  getBoundingBox(): { x: number; y: number; width: number; height: number } {}
  rotate(degree: number): void {}
  getPosition(): { x: number; y: number } {}
}

class Rectangle extends Shape implements IDrawable, ITransformable {
  private width: number;
  private height: number;
  private position: { x: number; y: number };

  constructor(width: number, height: number, x: number = 0, y: number = 0) {
    super(name, id);
    this.radius = radius;
    this.x = this.center.x;
    this.y = this.center.y;
  }

  getWidth(): number {}
  getHeight(): number {}
  getPosition(): { x: number; y: number } {}

  getArea(): number {}
  getPerimeter(): number {}
  scale(factor: number): number {}

  isSqurare(): boolean {}
  getDiagonal(): number {}
  getAspectRation(): number {}

  getBoundingBox(): { x: number; y: number; width: number; height: number } {}

  rotate(degree: number): void {}


}


class class Triangle extends Shape implements IDrawable, ITransformable {
  private sides: number;
  private vertices: number;

  constructor(sideA: number,sideB: number, sideC: number ) {
    // تأكد من صحة المثلث 
    //  أي طول أي ضلع أصغر من طول مجموع الضلعين الأخرين 
}


  getArea(): number {}
  getPerimeter(): number {}
  scale(factor: number): number {}

  getAngles(): {angleA: number, angelB: number, angelC: number}{


  }
  isEquilateral(): boolean{

  }
  isIsosceles(): boolean{}
  isRightAngled(): boolean{}

  getCircumradius(): number{}
  getInRadius(): number{}


  getBoundingBox(): { x: number; y: number; width: number; height: number } {}
  rotate(degree: number): void {}


}