import type {
  IShape,
  IComparable,
  IDrawable,
  ITransformable,
} from "./interfaces.js";
export abstract class Shape implements IShape, IComparable<Shape> {
  protected static totalShapes: number = 0;
  public readonly id: string;
  protected name: string;
  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
    Shape.totalShapes++;
  }

  abstract getArea(): number;
  abstract getPerimeter(): number;
  abstract scale(factor: number): number;

  getDescription(): string {
    return `The Shape Description is : Name: ${this.name} \n ID: ${this.id} \n Area: ${this.getArea()}`;
  }
  compare(other: Shape): number {
    if (other.getArea() > this.getArea()) {
      console.log(`The ${other.name} Wins Because it's area is bigger`);
    } else {
      console.log(`The Shape ${this.name} wins because Shape is bigger `);
    }
    return Math.abs(other.getArea() - this.getArea());
  }

  equals(other: Shape): boolean {
    return other.getArea() == this.getArea();
  }

  static getTotalShapes(): number {
    return Shape.totalShapes;
  }
}

export class ShapeUtilities {
  static calculateTotalArea(shapes: IShape[]): number {
    return shapes.reduce((acc, currentShape) => {
      return acc + currentShape.getArea();
    }, 0);
  }

  static findLargestShape(shapes: IShape[]): IShape | undefined {
    let shape: IShape | undefined = shapes[0];
    shapes.reduce((acc, currentShape) => {
      if (acc < currentShape.getArea()) {
        shape = currentShape;
        acc = currentShape.getArea();
      }
      return acc;
    }, 0);
    return shape;
  }
  static findSmallestShape(shapes: IShape[]): IShape | undefined {
    let shape: IShape | undefined = shapes[0];
    shapes.reduce((acc, currentShape) => {
      if (acc > currentShape.getArea()) {
        shape = currentShape;
        acc = currentShape.getArea();
      }
      return acc;
    }, 0);
    return shape;
  }
  static sortByArea(shapes: IShape[], ascending: boolean): IShape[] {
    const sortCallBack = (
      shapeA: IShape,
      shapeB: IShape,
      ascending: boolean,
    ) => {
      if (ascending) {
        return shapeA.getArea() - shapeB.getArea();
      } else {
        return shapeB.getArea() - shapeA.getArea();
      }
    };
    shapes.sort((shapeA, shapeB) => {
      return sortCallBack(shapeA, shapeB, ascending);
    });
    return shapes;
  }

  static getShapeTypeDistribution(shapes: IShape[]): string {
    const distribution: Record<string, number> = {};
    for (const shape of shapes) {
      const type = shape.constructor.name;
      distribution[type] = (distribution[type] ?? 0) + 1;
    }
    const entries = Object.entries(distribution);
    if (entries.length === 0) return "No shapes available.";
    return entries.map(([type, count]) => `${type}: ${count}`).join("\n");
  }
  static generateSummaryReport(shapes: IShape[]): string {
    if (shapes.length === 0) {
      return "Summary Report:\nNo shapes available.";
    }

    const totalArea = ShapeUtilities.calculateTotalArea(shapes);
    const averageArea = totalArea / shapes.length;
    const largest = ShapeUtilities.findLargestShape(shapes);
    const smallest = ShapeUtilities.findSmallestShape(shapes);

    return [
      "Summary Report:",
      `Total Shapes: ${shapes.length}`,
      `Total Area: ${totalArea.toFixed(2)}`,
      `Average Area: ${averageArea.toFixed(2)}`,
      `Largest Shape: ${largest ? largest.id : "N/A"} (Area: ${largest ? largest.getArea().toFixed(2) : "N/A"})`,
      `Smallest Shape: ${smallest ? smallest.id : "N/A"} (Area: ${smallest ? smallest.getArea().toFixed(2) : "N/A"})`,
      "Shape Distribution:",
      ShapeUtilities.getShapeTypeDistribution(shapes),
    ].join("\n");
  }
}
