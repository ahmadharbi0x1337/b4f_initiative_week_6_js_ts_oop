import { Circle, Rectangle, Triangle } from "./shapes.js";
import { ShapeManager } from "./manager.js";
import { ShapeUtilities } from "./abstract.js";

console.log("========== 1. إنشاء الأشكال ==========");

const c1 = new Circle(5, 0, 0);
const c2 = new Circle(3, 10, 10);
const r1 = new Rectangle(4, 6, 0, 0);
const r2 = new Rectangle(5, 5, 2, 2);
const t1 = new Triangle(3, 4, 5);
const t2 = new Triangle(5, 5, 6);
const t3 = new Triangle(6, 6, 6);

console.log(c1.getDescription());
console.log(t1.getDescription());

console.log("\n========== 2. المساحة والمحيط ==========");

console.log(
  "Circle(5) Area:",
  c1.getArea().toFixed(2),
  "Perimeter:",
  c1.getPerimeter().toFixed(2),
);
console.log("Rect(4x6) Area:", r1.getArea(), "Perimeter:", r1.getPerimeter());
console.log("Tri(3,4,5) Area:", t1.getArea(), "Perimeter:", t1.getPerimeter());
console.log("Tri(6,6,6) Area:", t3.getArea().toFixed(2));

console.log("\n========== 3. خصائص المثلث ==========");

console.log("t1 angles:", t1.getAngles());
console.log("t1 isRight?", t1.isRightAngled()); // true
console.log("t2 isIsosceles?", t2.isIsosceles()); // true
console.log("t3 isEquilateral?", t3.isEquilateral()); // true
console.log("t1 circumradius:", t1.getCircumradius().toFixed(2));
console.log("t1 inradius:", t1.getInRadius().toFixed(2));

console.log("\n========== 4. Bounding Box ==========");

console.log("Circle bb:", c1.getBoundingBox());
console.log("Rect bb:", r1.getBoundingBox());
console.log("Tri bb:", t1.getBoundingBox());

console.log("\n========== 5. getPosition ==========");

console.log("Circle pos:", c1.getPosition());
console.log("Rect pos:", r1.getPosition());
console.log("Tri pos (centroid):", t1.getPosition());

console.log("\n========== 6. Scale ==========");

const c3 = new Circle(2, 0, 0);
console.log("before:", c3.getArea().toFixed(2));
c3.scale(3);
console.log("after x3:", c3.getArea().toFixed(2));

console.log("\n========== 7. Rotation (Triangle) ==========");

const t4 = new Triangle(3, 4, 5);
const areaBefore = t4.getArea();
console.log("area before:", areaBefore.toFixed(4));
t4.rotate(90);
console.log("area after 90°:", t4.getArea().toFixed(4)); // نفس القيمة
console.log("bb after rotation:", t4.getBoundingBox());

console.log("\n========== 8. ShapeManager ==========");

const mgr = new ShapeManager();
mgr.addMultipleShapes([c1, c2, r1, r2, t1, t2, t3]);
console.log("count:", mgr.findShapes(() => true).length);
console.log("avg area:", mgr.getAverageArea().toFixed(2));
console.log("largest perimeter:", mgr.getLargestPerimeter()?.id);
console.log(
  "find big shapes (>30):",
  mgr.findShapes((s) => s.getArea() > 30).length,
);

console.log("getShape(c1.id):", mgr.getShape(c1.id)?.id);
console.log("remove c1:", mgr.removeShape(c1.id));
console.log("remove unknown:", mgr.removeShape("nope"));

console.log("\n========== 9. ShapeUtilities ==========");
const all = [c2, r1, r2, t1, t2, t3];
console.log("total area:", ShapeUtilities.calculateTotalArea(all).toFixed(2));
console.log("largest:", ShapeUtilities.findLargestShape(all)?.id);
console.log("smallest:", ShapeUtilities.findSmallestShape(all)?.id);
console.log(
  "sorted asc:",
  ShapeUtilities.sortByArea([...all], true).map((s) => s.getArea().toFixed(1)),
);

console.log("\n" + ShapeUtilities.generateSummaryReport(all));
console.log("\nDistribution:\n" + ShapeUtilities.getShapeTypeDistribution(all));
