function limitNoteLength(note: string): string {
    const maxLength = 10; // max. tecken som visas i kortet

    // Check if the note length exceeds the maximum length
    if (note.length > maxLength) {
        // om den överstiger - visa maxLength + '...'
        return note.substring(0, maxLength) + "...";
    } else {
        // om noten inte överstiger 50 tecken - return det vanliga värdet
        return note;
    }
}
