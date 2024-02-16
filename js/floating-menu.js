"use strict";
class Draggable {
    constructor(element) {
        this.isDragging = false;
        this.offset = { x: 0, y: 0 };
        this.isClickEvent = false;
        this.element = element;
        this.init();
    }
    init() {
        this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.element.addEventListener('click', this.onClick.bind(this));
    }
    onMouseDown(event) {
        this.isDragging = true;
        this.isClickEvent = true;
        const rect = this.element.getBoundingClientRect();
        this.offset = {
            x: event.clientX - rect.right,
            y: event.clientY - rect.bottom
        };
    }
    onMouseMove(event) {
        if (this.isDragging) {
            this.isClickEvent = false;
            const x = event.clientX - this.offset.x;
            const y = event.clientY - this.offset.y;
            this.element.style.right = `${window.innerWidth - x}px`;
            this.element.style.bottom = `${window.innerHeight - y}px`;
        }
    }
    onMouseUp() {
        this.isDragging = false;
    }
    onClick(event) {
        if (this.isClickEvent) {
            this.element.classList.toggle('show-buttons');
        }
        this.isClickEvent = false;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const floatingControlMenu = document.getElementById('floating-control-menu');
    if (floatingControlMenu) {
        new Draggable(floatingControlMenu);
    }
});
