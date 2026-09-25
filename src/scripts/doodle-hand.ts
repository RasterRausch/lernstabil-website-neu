// Doodly-Hand: eine freigestellte Hand mit rotem Marker, die Striche
// und Haken zieht, als wuerde gerade jemand von Hand auf die Seite
// schreiben. Genutzt in Sektion 3 (Haken) und Sektion 7 (Striche).
//
// Aufbau im Markup: <img class="hand" src="/bilder/hand-marker.webp">
// liegt absolut links oben in einem Bereich mit position: relative.
// Alle Punkte hier sind relativ zu diesem Bereich. Bewegt wird per
// transform, sodass die Stiftspitze genau auf dem Punkt sitzt.
//
// Das Bild endet rechts unten mit einer geraden Schnittkante durch den
// Aermel. Im Video laege sie ausserhalb des Bildes; hier steht die Hand
// mitten auf der Seite. Damit die Kante immer ausserhalb der Sektion
// laege, muesste der Arm vom obersten Haken bis zur Sektionskante
// reichen — gemessen am 25. September 2026 rund 670 px auf dem
// Bildschirm, im Bild etwa 2850 x 2850 px. Verworfen: Alexander fand den
// Arm dafuer zu lang. Stattdessen schneidet eine Maske in den Sektionen
// den Aermel schraeg ab, quer zum Arm (siehe --schnitt dort).
//
// Die Positionen werden beim Start einmal gemessen. Aendert jemand
// waehrend der Animation die Fenstergroesse, landet die Hand kurz
// neben der Linie; die Linien selbst stimmen trotzdem.

export type Punkt = { x: number; y: number };

// Stiftspitze im Bild, als Anteil von Breite und Hoehe. Gemessen am
// 25. September 2026 an der Vorlage (965 x 1022, Spitze bei 19 / 106).
const SPITZE_X = 19 / 965;
const SPITZE_Y = 106 / 1022;

// Wie ein Stift, der mit Druck gefuehrt wird: langsam angesetzt,
// schnell durchgezogen, hart abgebremst. Die Linie, die gerade
// entsteht, MUSS mit derselben Kurve und Dauer animiert werden wie
// die Hand — nur dann sitzt die Spitze am Ende der Linie.
export const KURVE_ZUG = "cubic-bezier(0.7, 0, 0.25, 1)";
const KURVE_WEG = "cubic-bezier(0.3, 0, 0.2, 1)";

// Millisekunden. Der Sprung zwischen zwei Linien ist kurz, damit die
// Pause dazwischen nicht laenger wird als der Zug selbst.
const ZEIT = { auftritt: 700, sprung: 350, abgang: 600 };

// Beim Sprung hebt die Hand ab: Der Mittelpunkt der Bahn liegt um
// diesen Anteil der Handhoehe hoeher.
const ABHEBEN = 0.04;

// Deckt eine Linie von links nach rechts auf. Der Rand von 6 px
// laesst die runden Strichenden stehen, die ueber die Grafik ragen.
// Links beginnt er bei 0, sonst waere das Strichende schon vor dem
// Ansetzen als roter Punkt zu sehen.
export const AUFDECKEN: Keyframe[] = [
  { clipPath: "inset(-6px 100% -6px 0)" },
  { clipPath: "inset(-6px -6px -6px -6px)" },
];

/**
 * Startet `ablauf` einmal, sobald `ziel` zur Haelfte sichtbar ist.
 *
 * Wer Bewegung abbestellt hat oder keinen IntersectionObserver hat,
 * bekommt gar nichts davon: `vorbereiten` (das die Linien verdeckt)
 * laeuft dann nicht, die Linien stehen fertig da. Laesst sich das Bild
 * nicht laden oder bricht der Ablauf ab, macht `aufgeben` die Linien
 * wieder sichtbar.
 */
export function beimErstenBlick(
  ziel: HTMLElement,
  bild: HTMLImageElement,
  vorbereiten: () => void,
  ablauf: () => Promise<void>,
  aufgeben: () => void,
) {
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (ruhig || !("IntersectionObserver" in window)) return;

  vorbereiten();

  const beobachter = new IntersectionObserver(
    async (eintraege) => {
      if (!eintraege.some((e) => e.isIntersecting)) return;
      beobachter.disconnect();
      try {
        // Erst messen, wenn die Schriften da sind: Die Linien liegen
        // unter Text in der Displayschrift von Adobe. Kommt sie nach der
        // Messung, verschieben sich die Woerter, und die Hand zieht
        // neben ihnen.
        await document.fonts.ready;
        await bild.decode();
        await ablauf();
      } catch {
        bild.style.visibility = "hidden";
        aufgeben();
      }
    },
    { threshold: 0.5 },
  );

  beobachter.observe(ziel);
}

export class Hand {
  private draussen: Punkt;
  private jetzt: Punkt;

  constructor(
    private bild: HTMLImageElement,
    private bereich: HTMLElement,
  ) {
    const box = bereich.getBoundingClientRect();
    // Ausserhalb rechts unten (Rechtshaender): Die Spitze liegt so weit
    // draussen, dass die Hand ausserhalb des Bereichs beginnt.
    this.draussen = {
      x: box.width + bild.offsetWidth * 0.3,
      y: box.height + bild.offsetHeight * 0.6,
    };
    this.jetzt = this.draussen;
  }

  /** Lage und Groesse eines Elements, relativ zum Bereich.

      Bereich und Element werden im selben Moment gemessen. Bis zum
      25. September 2026 wurde der Bereich nur einmal beim Start
      gemessen — scrollte man waehrend der Animation weiter, lag jede
      weitere Linie um die Scrollstrecke daneben. */
  rahmen(el: Element) {
    const box = this.bereich.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - box.left,
      y: r.top - box.top,
      b: r.width,
      h: r.height,
    };
  }

  /** Setzt die Spitze am Punkt an: beim ersten Mal von aussen herein,
      danach mit kurzem Abheben. */
  async hin(nach: Punkt) {
    if (this.jetzt === this.draussen) {
      this.bild.style.visibility = "visible";
      await this.bewege([nach], ZEIT.auftritt, KURVE_WEG);
      return;
    }
    const mitte = {
      x: (this.jetzt.x + nach.x) / 2,
      y: (this.jetzt.y + nach.y) / 2 - this.bild.offsetHeight * ABHEBEN,
    };
    await this.bewege([mitte, nach], ZEIT.sprung, KURVE_WEG);
  }

  /** Zieht eine Linie ueber die Punkte, mit KURVE_ZUG. `anteile` legt
      fest, bei welchem Anteil der Zeit jeder Punkt erreicht wird
      (erster Wert 0 fuer die aktuelle Lage, letzter 1). */
  async zieh(punkte: Punkt[], dauer: number, anteile?: number[]) {
    await this.bewege(punkte, dauer, KURVE_ZUG, anteile);
  }

  /** Zurueck nach rechts unten, dann unsichtbar. */
  async weg() {
    await this.bewege([this.draussen], ZEIT.abgang, KURVE_WEG);
    this.bild.style.visibility = "hidden";
  }

  private lage(p: Punkt) {
    const dx = this.bild.offsetWidth * SPITZE_X;
    const dy = this.bild.offsetHeight * SPITZE_Y;
    return `translate(${p.x - dx}px, ${p.y - dy}px)`;
  }

  private async bewege(
    ziele: Punkt[],
    dauer: number,
    kurve: string,
    anteile?: number[],
  ) {
    const bahn = [this.jetzt, ...ziele].map((p, i) => ({
      transform: this.lage(p),
      ...(anteile ? { offset: anteile[i] } : {}),
    }));
    await this.bild.animate(bahn, {
      duration: dauer,
      easing: kurve,
      fill: "forwards",
    }).finished;
    this.jetzt = ziele[ziele.length - 1];
  }
}

// Haken, wie sie im Markup stehen: viewBox 0 0 30 24, Pfad
// "M0 12 C 3 14, 6 17, 9 21 C 14 12, 21 6, 30 1". Anfang, Knick, Ende
// in viewBox-Koordinaten. Der Haken reicht ueber die volle Breite,
// damit das Aufdecken von links genau mit der Spitze mitlaeuft.
const HAKEN_ANFANG = { x: 0, y: 12 };
const HAKEN_KNICK = { x: 9, y: 21 };
const HAKEN_ENDE = { x: 30, y: 1 };

// Dauer eines Hakens in Millisekunden. Etwas laenger als ein Strich
// bei den Preisen (500), weil der Weg einen Knick hat.
const HAKEN_DAUER = 600;

/**
 * Laesst die Hand alle .haken in `liste` nacheinander abhaken, einmal
 * beim ersten Hineinscrollen. Genutzt in Sektion 3 und 5.
 *
 * Erwartet im Markup: `bereich` mit position: relative, darin `liste`
 * und <img class="hand">. In CSS verdeckt `.animiert .haken` die Haken,
 * bis die Hand sie zieht.
 */
export function hakenAbhaken(bereich: HTMLElement) {
  const liste = bereich.querySelector<HTMLElement>(".punkte");
  const bild = bereich.querySelector<HTMLImageElement>(".hand");
  if (!liste || !bild) return;

  beimErstenBlick(
    liste,
    bild,
    () => liste.classList.add("animiert"),
    async () => {
      const hand = new Hand(bild, bereich);
      for (const zeichen of liste.querySelectorAll<SVGElement>(".haken")) {
        const r = hand.rahmen(zeichen);
        const punkt = (p: Punkt) => ({
          x: r.x + (r.b * p.x) / 30,
          y: r.y + (r.h * p.y) / 24,
        });

        await hand.hin(punkt(HAKEN_ANFANG));
        zeichen.animate(AUFDECKEN, {
          duration: HAKEN_DAUER,
          easing: KURVE_ZUG,
          fill: "forwards",
        });
        // Der Knick liegt bei 9 von 30 der Breite. Weil das Aufdecken
        // gleichmaessig ueber die Breite laeuft, erreicht die Hand ihn
        // beim selben Anteil der Zeit.
        await hand.zieh(
          [punkt(HAKEN_KNICK), punkt(HAKEN_ENDE)],
          HAKEN_DAUER,
          [0, 9 / 30, 1],
        );
      }
      await hand.weg();
    },
    () => liste.classList.remove("animiert"),
  );
}
