const str = 'Viana do Castelo, Vila Real, Bragança, Braga, Porto, Aveiro, Viseu, Guarda, Coimbra, Castelo Branco, Leiria, Santarém, Portalegre, Lisboa, Setúbal, Évora, Beja, Faro'

export const distritos = str.split(', ').sort((a, b) => a.localeCompare(b));
;