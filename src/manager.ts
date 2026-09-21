import type { IShape } from "./interfaces.js";

export class ShapeManager {
  private shapes: IShape[] = [];

  addShape(shape: IShape): void {
    if (this.shapes.some((s) => s.id === shape.id)) {
      throw new Error(`A shape with id "${shape.id}" already exists.`);
    }
    this.shapes.push(shape);
  }

  removeShape(id: string): boolean {
    const index = this.shapes.findIndex((shape) => shape.id === id);
    if (index === -1) return false;
    this.shapes.splice(index, 1);
    return true;
  }

  getShape(id: string): IShape | undefined {
    return this.shapes.find((shape) => shape.id === id);
  }

  updateShape(id: string, updates: Partial<IShape>): boolean {
    const shape = this.getShape(id);
    if (!shape) return false;
    Object.assign(shape, updates);
    return true;
  }

  addMultipleShapes(shapes: IShape[]): void {
    for (const shape of shapes) {
      this.addShape(shape);
    }
  }

  clearAll(): void {
    this.shapes = [];
  }

  findShapes(predicate: (shape: IShape) => boolean): IShape[] {
    return this.shapes.filter(predicate);
  }

  getAverageArea(): number {
    if (this.shapes.length === 0) return 0;
    const total = this.shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
    return total / this.shapes.length;
  }

  getLargestPerimeter(): IShape | null {
    if (this.shapes.length === 0) return null;
    return this.shapes.reduce((largest, current) =>
      current.getPerimeter() > largest.getPerimeter() ? current : largest,
    );
  }
}
