export function animatePing(element: SVGSVGElement): void {
    element.animate(
        { transform: 'scale(2)', filter: 'opacity(0)' },
        {
            duration: 1000,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
        }
    );
}
