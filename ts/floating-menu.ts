interface Point {
    x: number;
    y: number;
}

class Draggable {
    private element: HTMLElement;
    private isDragging: boolean = false;
    private offset: Point = { x: 0, y: 0 };
    private isClickEvent: boolean = false;

    constructor(element: HTMLElement) {
        this.element = element;
        this.init();
    }

    private init() {
        this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    private onMouseDown(event: MouseEvent) {
        this.isDragging = true;
        this.isClickEvent = true;
        const rect = this.element.getBoundingClientRect();
        this.offset = {
            x: event.clientX - rect.right,
            y: event.clientY - rect.bottom
        };
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            this.isClickEvent = false;
            const x = event.clientX - this.offset.x;
            const y = event.clientY - this.offset.y;
            this.element.style.right = `${window.innerWidth - x}px`;
            this.element.style.bottom = `${window.innerHeight - y}px`;
        }
    }

    private onMouseUp() {
        this.isDragging = false;
    }

    private onClick(event: MouseEvent) {
        if (this.isClickEvent) {
            this.element.classList.toggle('show-buttons');
        }
        this.isClickEvent = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const floatingControlMenu = document.getElementById('floating-control-menu');
    if (floatingControlMenu) {
        new Draggable(floatingControlMenu);
    }
});
