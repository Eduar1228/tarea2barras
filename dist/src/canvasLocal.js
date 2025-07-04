export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 8 * 7;
    }
    iX(x) {
        return Math.round(this.centerX + x / this.pixelSize);
    }
    iY(y) {
        return Math.round(this.centerY - y / this.pixelSize);
    }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    drawRmboide(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        this.graphics.fillStyle = color;
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.lineTo(x3, y3);
        this.graphics.lineTo(x4, y4);
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();
    }
    paint() {
        const porcentajes = [10, 30, 80, 50];
        const colores = ['#00BFFF', '#7CFC00', '#FF1493', '#FF8C00'];
        const anchoBarra = 0.5;
        const baseAltura = 5;
        const espacio = 2;
        this.graphics.clearRect(0, 0, this.maxX, this.maxY);
        this.graphics.font = "bold 12px Arial";
        this.graphics.textAlign = "center";
        // Ejes y líneas guías
        this.graphics.strokeStyle = '#888';
        this.drawLine(this.iX(0.5), this.iY(0), this.iX(9), this.iY(0)); // eje x
        this.drawLine(this.iX(0.5), this.iY(0), this.iX(0.5), this.iY(5)); // eje y
        for (let y = 0; y <= baseAltura; y++) {
            this.drawLine(this.iX(0.4), this.iY(y), this.iX(9), this.iY(y));
            this.graphics.fillText(`${y * 20}`, this.iX(0.2), this.iY(y) + 4);
        }
        let x = 1.5;
        for (let i = 0; i < porcentajes.length; i++) {
            const porcentaje = porcentajes[i];
            const alturaReal = (porcentaje / 100) * baseAltura;
            const baseY = 0;
            const color = colores[i];
            // Barra blanca completa 
            this.drawRmboide(this.iX(x), this.iY(baseY), this.iX(x - anchoBarra), this.iY(baseY + 0.3), this.iX(x - anchoBarra), this.iY(baseY + baseAltura + 0.3), this.iX(x), this.iY(baseY + baseAltura), "#ffffff");
            this.drawRmboide(this.iX(x), this.iY(baseY), this.iX(x + anchoBarra), this.iY(baseY + 0.3), this.iX(x + anchoBarra), this.iY(baseY + baseAltura + 0.3), this.iX(x), this.iY(baseY + baseAltura), "#eeeeee");
            this.drawRmboide(this.iX(x - anchoBarra), this.iY(baseY + baseAltura + 0.3), this.iX(x), this.iY(baseY + baseAltura), this.iX(x + anchoBarra), this.iY(baseY + baseAltura + 0.3), this.iX(x), this.iY(baseY + baseAltura + 0.6), "#dddddd");
            // Parte coloreada porcentaje real
            this.drawRmboide(this.iX(x), this.iY(baseY), this.iX(x - anchoBarra), this.iY(baseY + 0.3), this.iX(x - anchoBarra), this.iY(baseY + alturaReal + 0.3), this.iX(x), this.iY(baseY + alturaReal), this.oscurecerColor(color));
            this.drawRmboide(this.iX(x), this.iY(baseY), this.iX(x + anchoBarra), this.iY(baseY + 0.3), this.iX(x + anchoBarra), this.iY(baseY + alturaReal + 0.3), this.iX(x), this.iY(baseY + alturaReal), color);
            // Texto porcentaje debajo
            this.graphics.fillStyle = color;
            this.graphics.fillText(porcentaje + "%", this.iX(x), this.iY(-0.8));
            x += espacio;
        }
    }
    oscurecerColor(color, porcentaje = 20) {
        const num = parseInt(color.replace("#", ""), 16);
        const factor = Math.round(2.55 * porcentaje);
        const R = (num >> 16) - factor;
        const G = (num >> 8 & 0x00FF) - factor;
        const B = (num & 0x00FF) - factor;
        const nuevoColor = `#${(0x1000000 +
            (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0)).toString(16).slice(1)}`;
        return nuevoColor;
    }
}
export function dibujarBarras(ctx, valores) {
    const width = 50;
    const spacing = 20;
    const colores = ["#007BFF", "#28A745", "#FFC107", "#DC3545"];
    valores.forEach((valor, i) => {
        const x = i * (width + spacing) + 50;
        const y = ctx.canvas.height - valor * 4;
        ctx.fillStyle = colores[i % colores.length];
        ctx.fillRect(x, y, width, valor * 4);
    });
}
export function dibujarLinea(ctx, valores) {
    const spacing = 80;
    ctx.beginPath();
    ctx.strokeStyle = "#6f42c1";
    ctx.lineWidth = 3;
    valores.forEach((valor, i) => {
        const x = i * spacing + 75;
        const y = ctx.canvas.height - valor * 4;
        if (i === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
}
