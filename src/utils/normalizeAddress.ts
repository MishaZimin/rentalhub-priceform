export const normalizeAddress = (input: string): string => {
    const cleanInput = input.trim().toLowerCase();

    const streetPattern =
        /(\b(улица|ул|пр|шос|просп|пл|туп|кв)\b[\s]*)([^\d]+?)\s*(\d+)/i;
    const housePattern = /\d+/;

    const houseMatch = cleanInput.match(housePattern);
    const houseNumber = houseMatch ? houseMatch[0] : "unknown number";

    let street = "";
    let formattedAddress = "";

    const match = cleanInput.match(streetPattern);
    if (match) {
        const type = match[2] || "улица";
        street = match[3].trim();
        formattedAddress = `${type} ${street}, ${houseNumber}, Екатеринбург`;
    } else {
        street = cleanInput.replace(housePattern, "").trim();
        formattedAddress = `улица ${street}, ${houseNumber}, Екатеринбург`;
    }

    return formattedAddress;
};
