import { Graphics, Container } from "pixi.js";
import { GlobalContext } from "./GlobalContext";

export function createBoundary(ctx: GlobalContext) {

    const BOUNDARY_RECT_THICKNESS = 10;
    const BOUNDARY_RECT_COLOR = "#333333";

    const app = ctx.app;
    const WORLD_SIZE = ctx.WORLD_SIZE;
    const UNIT_LENGTH = ctx.UNIT_LENGTH;
    const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
    const LOWER_BOUND_Y = ctx.LOWER_BOUND_Y;
    const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
    const RIGHT_BOUND_X = ctx.RIGHT_BOUND_X;

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
        app.screen.width / 2,
        UPPER_BOUND_Y - BOUNDARY_RECT_THICKNESS / 2,
    )
    lowerBoundaryRect.position.set(
        app.screen.width / 2,
        LOWER_BOUND_Y + BOUNDARY_RECT_THICKNESS / 2,
    )
    leftBoundaryRect.position.set(
        LEFT_BOUND_X - BOUNDARY_RECT_THICKNESS / 2,
        app.screen.height / 2,
    )
    rightBoundaryRect.position.set(
        RIGHT_BOUND_X + BOUNDARY_RECT_THICKNESS / 2,
        app.screen.height / 2,
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