import { Graphics, Container } from "pixi.js";
import { GlobalContext } from "./GlobalContext";

export function createBoundary(ctx: GlobalContext) {

    const BOUNDARY_RECT_THICKNESS = 10;
    const BOUNDARY_RECT_COLOR = "#333333";

    const WORLD_SIZE = ctx.WORLD_SIZE;
    const UNIT_LENGTH = ctx.UNIT_LENGTH;

    let upperBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let lowerBoundaryRect = new Graphics()
        .rect(0, 0, WORLD_SIZE.x * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS, BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let leftBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)
    let rightBoundaryRect = new Graphics()
        .rect(0, 0, BOUNDARY_RECT_THICKNESS, WORLD_SIZE.y * UNIT_LENGTH + 2 * BOUNDARY_RECT_THICKNESS)
        .fill(BOUNDARY_RECT_COLOR)

    upperBoundaryRect.position.set(
        0,
        - (WORLD_SIZE.y * UNIT_LENGTH / 2 + BOUNDARY_RECT_THICKNESS / 2),
    )
    lowerBoundaryRect.position.set(
        0,
        + (WORLD_SIZE.y * UNIT_LENGTH / 2 + BOUNDARY_RECT_THICKNESS / 2),
    )
    leftBoundaryRect.position.set(
        - (WORLD_SIZE.x * UNIT_LENGTH / 2 + BOUNDARY_RECT_THICKNESS / 2),
        0,
    )
    rightBoundaryRect.position.set(
        + (WORLD_SIZE.x * UNIT_LENGTH / 2 + BOUNDARY_RECT_THICKNESS / 2),
        0,
    )

    upperBoundaryRect.updateTransform({
        pivotX: upperBoundaryRect.width / 2,
        pivotY: upperBoundaryRect.height / 2,
    })
    lowerBoundaryRect.updateTransform({
        pivotX: lowerBoundaryRect.width / 2,
        pivotY: lowerBoundaryRect.height / 2,
    })
    leftBoundaryRect.updateTransform({
        pivotX: leftBoundaryRect.width / 2,
        pivotY: leftBoundaryRect.height / 2,
    })
    rightBoundaryRect.updateTransform({
        pivotX: rightBoundaryRect.width / 2,
        pivotY: rightBoundaryRect.height / 2,
    })

    upperBoundaryRect.label = "Upper Boundary Rect";
    lowerBoundaryRect.label = "Lower Boundary Rect";
    leftBoundaryRect.label = "Left Boundary Rect";
    rightBoundaryRect.label = "Right Boundary Rect";

    let container = new Container();
    container.label = "Boundary"

    container.addChild(upperBoundaryRect);
    container.addChild(lowerBoundaryRect);
    container.addChild(leftBoundaryRect);
    container.addChild(rightBoundaryRect);

    return container;
}