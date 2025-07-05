// =========================================================
// CONFIGURAÇÕES DO MERCADO PAGO
// =========================================================
const MERCADO_PAGO_PUBLIC_KEY = "APP_USR-29c92465-6af3-4415-afd9-cd41511d7f8e"; // <-- SUBSTITUA PELA SUA CHAVE PÚBLICA
const BACKEND_URL = "https://apihook.onrender.com"; // <-- SUBSTITUA PELA URL DO SEU BACKEND NO RENDER

// Inicializa o SDK do Mercado Pago
const mp = new MercadoPago(MERCADO_PAGO_PUBLIC_KEY);

// Variável para guardar a instância dos bricks
let cardPaymentBrickController;

// Estrutura de Produtos por Categoria
const allProducts = {
    salgados: [
        { id: 'salgado1', name: 'Pastel de frango', description: 'frango com milho', price: 5.00, complements: 1, img: '/icons/pastelfrango.png' },
        { id: 'salgado2', name: 'Pastel frango com queijo', description: 'frango com milho e queijo', price: 6.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado3', name: 'Pastel de queijo', description: 'pastel de queijo', price: 6.00, complements: 1, img: '/icons/pastelqueijo.png' },
        { id: 'salgado4', name: 'Pastel presunto com queijo', description: 'presunto e queijo', price: 6.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado5', name: 'Pastel de carne', description: 'pastel de carne bovina', price: 6.00, complements: 1, img: '/icons/pastelcarne.png' },
        { id: 'salgado6', name: 'Bomba', description: 'presunto e queijo', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Bomba' },
        { id: 'salgado7', name: 'Pastel de Frango com catupiry', description: '', price: 8.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado8', name: 'Carne + queijo', description: '', price: 8.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado9', name: 'Frango com queijo mais queijo', description: '', price: 8.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado10', name: 'Pastel de frango queijo e catupiry', description: '', price: 8.00, complements: 1, img: 'https://via.placeholder.com/80?text=Pastel' },
        { id: 'salgado11', name: 'Coxinha', description: 'frango', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Coxinha' },
        { id: 'salgado12', name: 'Batata de 10', description: 'batata frita', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fritas' },
        { id: 'salgado13', name: 'BATATA DE 15', description: 'batata frita de 15', price: 15.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fritas' },
        { id: 'salgado14', name: 'Batata frita 20', description: 'batata frita de 20', price: 20.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fritas' },
        { id: 'salgado15', name: 'Filé com fritas', description: 'Acompanha molho carne tomate alface limão batata', price: 60.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fil%C3%A9' },
        { id: 'salgado16', name: 'Filé com Fritas', description: '', price: 30.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fil%C3%A9' },
        { id: 'salgado17', name: 'Filé com calabresa', description: 'Filé com calabresa acebolada farofa', price: 40.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fil%C3%A9' },
        { id: 'salgado18', name: 'Filé acebolado', description: '', price: 25.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fil%C3%A9' },
        { id: 'salgado19', name: 'Calabresa com fritas', description: '', price: 30.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fritas' },
        { id: 'salgado20', name: 'BATATA COM BACON', description: '', price: 25.00, complements: 0, img: '/icons/batatabacon.png' },
        { id: 'salgado21', name: 'Batata com calabresa', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Fritas' },
        { id: 'salgado22', name: 'Calabresa acebolada', description: '', price: 20.00, complements: 0, img: 'https://via.placeholder.com/80?text=Calabresa' },
        { id: 'salgado24', name: 'FANDANGOS DE 35G', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Salgadinho' },
        { id: 'salgado25', name: 'Amendoins Japonês 145g', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Amendoim' },
    ],
    hamburguer: [
        { id: 'hamburguer1', name: 'Misto', description: 'pão, presunto e queijo IMAGEM ILUSTRATIVA', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Misto' },
        { id: 'hamburguer2', name: 'Hamburguer', description: 'pão, carne, tomate, alface IMAGEM ILUSTRATIVA', price: 8.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer3', name: 'X-burguer', description: 'pão, carne, queijo, tomate, alface, molho', price: 12.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer4', name: 'Egg-burguer', description: 'pão, carne, ovo, tomate, alface, maionese', price: 12.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer5', name: 'X-salada', description: 'pão, carne, queijo, presunto e salada IMAGEM ILUSTRATIVA', price: 12.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer6', name: 'X-frango', description: 'pão, frango, queijo, tomate, alface, molho', price: 12.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer7', name: 'Egg-Frango', description: 'pão, frango, ovo, tomate, alface, maionese IMAGEM ILUSTRATIVA', price: 12.00, complements: 3, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer8', name: 'Egg x burguer', description: 'pão, carne, ovo, queijo, tomate, alface, maionese', price: 15.00, complements: 4, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer9', name: 'Egg x-Frango', description: 'pão, frango, queijo, ovo, tomate, alface, maionese IMAGEM ILUSTRATIVA', price: 15.00, complements: 4, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer10', name: 'X-Filé', description: 'pão, carne, filé, queijo, ovo, tomate, alface IMAGEM ILUSTRATIVA', price: 18.00, complements: 4, img: '/icons/xfile.png' },
        { id: 'hamburguer11', name: 'X-Calabresa', description: 'pão, carne, calabresa, queijo, ovo, tomate, alface (imagem ilustrativa)', price: 18.00, complements: 4, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer12', name: 'X-Tudo', description: 'pão, carne, bacon, presunto, queijo cheddar, catupiry, tomate, alface (imagem ilustrativa)', price: 20.00, complements: 4, img: 'https://via.placeholder.com/80?text=Burger' },
        { id: 'hamburguer13', name: 'X-Tudão', description: 'pão, duas carne, bacon, presunto, calabresa, queijo cheddar, catupiry, tomate, alface, maionese IMAGEM ILUSTRATIVA', price: 25.00, complements: 4, img: '/icons/xtudao.png' },
    ],
    sucos_e_vitaminas: [
        { id: 'suco1', name: 'SUCOS BACURI', description: 'vitamina de bacuri', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco2', name: 'SUCO DE ACEROLA', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco3', name: 'SUCO DE GOIABA', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco4', name: 'SUCO DE CAJÁ', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco5', name: 'SUCO DEL VALLE LARANJA 450ml', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco6', name: 'Água de coco', description: '', price: 20.00, complements: 0, img: 'https://via.placeholder.com/80?text=Coco' },
        { id: 'suco7', name: 'ALEGRIA (SUCO DE LARANJA DE 320 ML)', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
        { id: 'suco8', name: 'Água mineral', description: 'Água mineral 510 ml', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=%C3%81gua' },
        { id: 'suco9', name: 'Power ade', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Isot%C3%B4nico' },
        { id: 'suco10', name: 'Toddynho', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Achocolatado' },
        { id: 'suco11', name: 'DELVALE DE 1/5 LARANJA', description: '', price: 12.00, complements: 0, img: 'https://via.placeholder.com/80?text=Suco' },
    ],
    refrigerantes: [
        { id: 'refri1', name: 'Caçulinha guaraná 200 mL', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri2', name: 'Caçulinha coca', description: 'Caçulinha coca 250 ml', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri3', name: 'Fanta laranja de 250 ml', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri4', name: 'COCA KS 290 ml', description: 'coca cola ks 290 ml', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri5', name: 'Coca café', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri6', name: 'Coca-Cola lata', description: 'Coca-cola em lata de 350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri7', name: 'Coca cola zero 350 ml', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri8', name: 'Guaraná de lata', description: 'guaraná em lata de 350 ml', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri9', name: 'Guaraná Jesus', description: 'Guaraná Jesus de 350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri10', name: 'Fanta Uva de lata', description: 'fanta uva em lata de 350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri11', name: 'Fanta laranja lata', description: 'pepsi em lata de 350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri12', name: 'Refrigerantes Schweppes LATA', description: '350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri13', name: 'H2O ÁGUA 500ml', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri14', name: 'Guaraná de 1L', description: 'guaraná 1 litro', price: 7.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri15', name: 'Sukita de laranja de 1L', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri16', name: 'Coca retornável', description: 'REFRIGERANTE COCA-COLA RETORNÁVEL 1 litro', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri17', name: 'Pepsi retornável', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri18', name: 'Fanta retornável de 1 litro', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri19', name: 'Coca pet de 1L', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri20', name: 'Coca-cola zero de 1 litro e meio', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri21', name: 'Coca-cola litro e meio', description: 'coca-cola litro e meio', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri22', name: 'Coca-cola 2 litros', description: 'coca cola 2 litros', price: 15.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri23', name: 'Guaraná de um litro e meio', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri24', name: 'Guaraná Antarctica 2 litros', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri25', name: 'Coca-cola zero de 2 L', description: '', price: 13.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri26', name: 'Água mineral natural com gás', description: 'Água mineral natural petropolitana 350 ml', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=%C3%81gua' },
        { id: 'refri27', name: 'ÁGUA MINERAL SEM 1500ml', description: 'Água cristalina do Piauí sem gás', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=%C3%81gua' },
        { id: 'refri28', name: 'Pepsi lata 350 ml', description: '', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri29', name: 'Fanta laranja de 1L pet', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri30', name: 'Guaraná de 600', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
        { id: 'refri31', name: 'Pepse de 2 Lt', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Refri' },
    ],
    energeticos: [
        { id: 'energ1', name: 'MONSTER ENERGY 473 ml', description: 'ENERGÉTICO MONSTER 473 ML', price: 13.00, complements: 0, img: 'https://via.placeholder.com/80?text=Energ%C3%A9tico' },
        { id: 'energ2', name: 'POWER ADE SABOR LARANJA', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Energ%C3%A9tico' },
        { id: 'energ3', name: 'POWER ADE SABOR MIX DE FRUTAS', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Energ%C3%A9tico' },
        { id: 'energ4', name: 'Vulcano de 2L', description: '', price: 25.00, complements: 0, img: 'https://via.placeholder.com/80?text=Energ%C3%A9tico' },
        { id: 'energ5', name: 'Dopamina 473 ml', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Energ%C3%A9tico' },
    ],
    bombons: [
        { id: 'bombom1', name: 'TRIDENT', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom2', name: 'HALLS', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom3', name: 'Pirulito Neopop', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom4', name: 'Chiclete de bola', description: 'Chiclete Buzzy tatuagem', price: 0.20, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom5', name: 'Bala canudinho Tutti Frutti 15g', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom6', name: 'Pirulito + popping candy', description: 'Pirulito que estoura na boca', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom7', name: 'Balas de caramelo recheados', description: '', price: 0.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom8', name: 'Balas sortidas de leite', description: '', price: 0.10, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom9', name: 'Balas de hortelã', description: '', price: 0.15, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom10', name: 'Pop mania', description: 'Pirulito pop mania', price: 0.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom11', name: 'Gomaks', description: 'Goma tipo americana 32g', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom12', name: 'CROC', description: 'Chiclete croc 172 g', price: 0.35, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom13', name: 'Bubbaloo', description: '', price: 0.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom14', name: 'Freegells', description: 'bala de mascar freegells', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom15', name: 'Coloreti', description: 'pastilhas coloridas de chocolate', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom16', name: 'Top mania pinta a língua', description: '', price: 1.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom17', name: 'Pirulito Neopop (cópia)', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom18', name: 'Paçoca de Mendonça', description: 'Paçoca de amendoim 15g', price: 0.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom19', name: 'Pé de moleque', description: 'pé de moleque 16g Amedupã', price: 0.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom20', name: 'WIZZY mm', description: 'Corolete', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom21', name: 'Fini de 26g', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom22', name: 'Amendoim japonês', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom23', name: 'Barra de chocolate', description: '', price: 8.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom24', name: 'Trident 25,2 g', description: 'Trident sem açúcar', price: 7.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom25', name: 'Trident X Senses 28 unidade', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom26', name: 'Bubbaloo 15g', description: 'BALA super macia', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom27', name: 'Tictac', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom28', name: 'Sonho de Valsa', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom29', name: 'Pirulito pop Brink mini frutas 6g', description: '', price: 0.25, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom30', name: 'Pirulito Azé mola 13,5g', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom31', name: 'MENTOS DE 5 UNIDADES 8,5G', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom32', name: 'Croc.Choc', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom33', name: 'Fini BEIJOS PESO 15G', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom34', name: 'Tic tac', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom35', name: 'Fini tubes 15 g', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom36', name: 'OREO DE 20G', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom37', name: 'Ouro Branco de 20g', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom38', name: 'Bis de 100,8g', description: '', price: 8.50, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
        { id: 'bombom39', name: 'Catavento 18 g', description: '', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Doce' },
    ],
    sorvetes_e_picoles: [
        { id: 'frios1', name: 'Sorvete', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Sorvete' },
        { id: 'frios2', name: 'Sorvete Moreninha (cópia)', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Sorvete' },
        { id: 'frios10', name: 'Picolé de açaí', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Picol%C3%A9' },
        { id: 'frios11', name: 'Casquinha com canudo', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Sorvete' },
    ],
    cervejas: [
        { id: 'cerveja1', name: 'IMPERIO 600 ml', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja2', name: 'Brahma 600', description: 'cerveja Brahma 600 ml', price: 9.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja3', name: 'ANTARCTICA 600', description: '', price: 10.00, complements: 0, img: '/icons/antarctica.png' },
        { id: 'cerveja4', name: 'BUDWEISER 600 ML', description: 'BUDWEISER CERVEJA', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja5', name: 'Spaten 600', description: 'cerveja Spaten 600 ml', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja6', name: 'Heineken long neck', description: 'Cerveja Heineken Long Neck 330ml', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja7', name: 'Heineken 600', description: 'cerveja Heineken 600ml', price: 15.00, complements: 0, img: '/icons/heineken.png' },
        { id: 'cerveja8', name: 'Stella Artois de 600ml', description: 'Cerveja', price: 12.00, complements: 0, img: '/icons/stella.png' },
        { id: 'cerveja9', name: 'Skol Beats', description: 'cerveja Skol Beats 269 ml', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja10', name: 'SOL', description: 'Cerveja long neck Eisenbahn 355ml', price: 7.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja11', name: 'SKOL LATA', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja12', name: 'Skol Beats Senses', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja13', name: 'STELLA ARTOIS LONG NECK 330 ML', description: 'Estella Artois 330ml', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja14', name: 'Antarctica Original 600 ML', description: 'cerveja de 600 ML', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja15', name: 'Ice 51', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja16', name: 'Corona 330 ml', description: '', price: 10.00, complements: 0, img: '/icons/corona.png' },
        { id: 'cerveja17', name: 'Dose de Campari', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Dose' },
        { id: 'cerveja18', name: 'Budweiser long neck', description: '', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja19', name: 'Skol lata', description: '', price: 60.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja20', name: 'Caixa de Skol de 600 ML', description: '', price: 240.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja21', name: 'Dose de whisky', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Dose' },
        { id: 'cerveja22', name: 'Uma CX Stella Artois de 600ml', description: '', price: 288.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja23', name: 'Heineken lata zero 360 ml', description: '', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja24', name: '12 Estella de 600', description: 'Meia caixa de cerveja', price: 144.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja25', name: 'Heineken de 600ML', description: '', price: 360.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja26', name: 'Spaten de 600 ml', description: '', price: 240.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja27', name: 'Meia caixa de Skol', description: '', price: 108.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja28', name: 'Um CX de Budweiser', description: '', price: 240.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja29', name: 'JACKDANIELS DE 3500ML', description: '', price: 12.00, complements: 0, img: 'https://via.placeholder.com/80?text=Whisky' },
        { id: 'cerveja30', name: 'Heineken long neck 10 un', description: '', price: 100.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
        { id: 'cerveja31', name: 'Stella long neck uma cx (cópia)', description: '', price: 240.00, complements: 0, img: 'https://via.placeholder.com/80?text=Cerveja' },
    ],
    mercado: [
        { id: 'mercado1', name: 'Amendupã', description: 'snacks Amedupã', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado2', name: 'Doritos 37g', description: 'Salgadinho Elma Chips Doritos', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado3', name: 'Cheetos de 40g', description: 'salgadinho Cheetos 45 gramas', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado4', name: 'Batata Ruffles original 33g', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado5', name: 'Petas Dona Ana', description: 'Pretas 70 g', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado6', name: 'Batata FRIKS', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado7', name: 'Cajuína', description: 'cajuína Dubéco 500ml', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado8', name: 'Castanha de caju', description: 'castanha de caju', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado9', name: 'AMENDOIM TORRADO COM CASCA', description: 'AMENDOIM TORRADO COM CASCA 80g', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado10', name: 'Papel Toalha Familiar', description: 'Papel Toalha Familiar pct c/ 02 rolos de 50 fls', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado11', name: 'BISCOITO RECHEADO', description: 'BISCOITO RECHEADO ITAMARATY 115G', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado12', name: 'Óleo de COZINHA', description: 'ÓLEO DE COZINHA SINHA', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado13', name: 'Bis 45g', description: '', price: 4.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado14', name: 'Biscoito recheado bolo de bola', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado15', name: 'AÇUCAR OLHO D\'ÁGUA', description: 'AÇUCAR OLHO D\'ÁGUA 1 KILO', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado16', name: 'Biscoito Wafer', description: 'Richester Amori Pacote 120g', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado17', name: 'Água mineral 510 ML', description: 'Água adicionada de sais', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado18', name: 'Lacta de 80 g', description: 'Biscoito', price: 8.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado19', name: 'ÁGUA DE COCO KERO-COCO', description: '', price: 20.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado20', name: 'Arroz qualite clássico', description: 'Peso líquido 1kg', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado21', name: 'Macarrão instantâneo', description: 'Macarrão instantâneo com tempero sabor galinha caipira', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado22', name: 'Mini OREO DE 35G', description: '', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado23', name: 'Newafer sabor brigadeiro de 100g', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado24', name: 'Suco uva', description: 'Frisco de uva', price: 1.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado25', name: 'Bic', description: 'Bic acende até 3000 vezes', price: 6.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado26', name: 'BLACK & WHITE', description: '', price: 75.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado27', name: 'Kit de Montilla', description: 'Montilla +coca de 2L + 1gelo', price: 55.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado28', name: 'Sal 1Kg', description: '', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado29', name: 'Biscoito Spantoo 30g', description: '', price: 1.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado30', name: 'Biscoito Spantoo 80g', description: '', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado31', name: 'COLA INSTANTÂNEA', description: 'COLA STRIKE PRO INSTANTÂNEA 20g', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado32', name: 'Coco Unidade', description: 'a unidade do coco', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado33', name: 'CREME DE LEITE', description: '', price: 4.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado34', name: 'Leite condensado integral', description: 'Camponesa 395 g', price: 7.75, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado35', name: 'Caneta detectora de notas falsas', description: '', price: 15.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado36', name: 'Sardinha 88 com óleo', description: '', price: 6.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado37', name: 'Sardinha 88 com molho de tomate', description: '', price: 6.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado38', name: 'STICK LOOK WAFER', description: '', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado39', name: 'Fermento biológico', description: '', price: 18.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado40', name: 'Coco da praia', description: 'Coco Verde gelado', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado41', name: 'Nescau 1.62 L', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado42', name: 'Hamburgueira FIBRAFORM PEQUENA', description: '', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado43', name: 'Olho de Parr', description: 'Whisky Old Parr', price: 200.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado44', name: 'Azeitona predilecta', description: 'Peso líquido 170g', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado45', name: 'Red Label', description: '', price: 130.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado46', name: 'Campari 1 ml', description: '', price: 80.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado47', name: 'Ypióca ouro', description: '', price: 30.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado48', name: 'Club social 106g', description: 'Club social original', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado49', name: 'Ovos', description: '', price: 1.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado50', name: 'Paperlito Max', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado51', name: 'Vodka Skyy 750 ML', description: '750 ML', price: 38.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado52', name: 'AZEITONAS VERDES FATIADAS', description: '', price: 6.50, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado53', name: 'Kero coco 330 ML', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado54', name: 'Trio barra de cereais', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado55', name: 'Copos 550 ml', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado56', name: 'Montilla', description: '', price: 35.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado57', name: 'Gás', description: '', price: 125.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado58', name: 'Colgate fio', description: '', price: 16.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado59', name: 'Batata lisa 40 g', description: 'Gune batata lisa', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado60', name: 'Isopor de cerveja', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado61', name: 'D+ KETCHUP', description: '', price: 12.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado62', name: 'D+ Maionese', description: '', price: 12.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado63', name: 'AZEITONA VERDE PALISTINHA 130g', description: '', price: 2.45, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado64', name: 'SARDINHA PESCADOR', description: 'COM ÓLEO 125 G', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado65', name: 'SARDINHA 88', description: 'SARDINHA 88 COM ÓLEO', price: 6.60, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
        { id: 'mercado66', name: 'SARDINHA 88 125g', description: 'SARDINHA 88 COM MOLHO DE TOMATE', price: 6.60, complements: 0, img: 'https://via.placeholder.com/80?text=Mercado' },
    ],
    frios: [
        { id: 'frios3', name: 'Massa para fazer pastel', description: 'Massa para pastel Sandella 1kg', price: 11.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios4', name: 'Fritas', description: 'Batatas fritas cortadas fries 2 kg', price: 40.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios5', name: 'GELO 1 KG (cópia)', description: 'gelo', price: 6.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios6', name: 'LINGUIÇA calabresa Dalia', description: 'valor do meio KG', price: 15.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios7', name: 'Filé peito de frango 1 kg', description: '', price: 26.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios8', name: 'QUEIJO MUSSARELA 1 kg', description: '', price: 55.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios9', name: 'Toddynho', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios12', name: 'Gelo do bom', description: '', price: 10.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
        { id: 'frios13', name: 'Massa para pastel de 1 kg', description: '', price: 12.00, complements: 0, img: 'https://via.placeholder.com/80?text=Frios' },
    ],
    higiene_e_limpeza: [
        { id: 'hig1', name: 'Sabão em pó, ALA 5 EM 1', description: '500 g', price: 5.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig2', name: 'Esponja de aço Assolan', description: 'Contém 8 unidades', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig3', name: 'Limpol', description: '', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig4', name: 'Sabão Ypê neutro Original', description: '', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig5', name: 'Absorvente noturno com abas', description: '8 unidades', price: 7.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig6', name: 'Absorvente suave sem abas', description: '15 unidades', price: 5.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig7', name: 'Cotonetes', description: 'Contém 75 unidades', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig8', name: 'Desengordurante Bleach', description: 'Limpa e desengordura sem esforço', price: 11.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig9', name: 'Água sanitária econômico', description: '', price: 4.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig10', name: 'ESPONJA MULTIUSO', description: '', price: 2.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig11', name: 'Barbeador três lâminas', description: '', price: 3.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig12', name: 'SABONETE FLOR DE YPÊ 85G', description: '', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig13', name: 'Escovas dent', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig14', name: 'BAYCON de 217 g', description: '', price: 13.00, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
        { id: 'hig15', name: 'ODORIZANTE SANITÁRIO', description: 'Lava bem', price: 4.50, complements: 0, img: 'https://via.placeholder.com/80?text=Higiene' },
    ],
    outros_produtos: [
        { id: 'outros1', name: 'Cigarro', description: '', price: 5.00, complements: 0, img: 'https://via.placeholder.com/80?text=Outros' },
        { id: 'outros2', name: 'Pix', description: '', price: 95.00, complements: 0, img: 'https://via.placeholder.com/80?text=Outros' },
        { id: 'outros3', name: 'Tenda piramidal', description: '4 por 6', price: 500.00, complements: 0, img: '/icons/tendapiramidal.png' },
    ],
    descartaveis: [
        { id: 'desc1', name: 'Copos descartáveis', description: 'Copos plásticos 180 ml branco Contém 100 unidades ideal para água e refrigerante', price: 7.00, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
        { id: 'desc2', name: 'Papel Toalha Familiar (cópia)', description: 'Papel Toalha Familiar pct c/ 02 rolos de 50 fls', price: 7.00, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
        { id: 'desc3', name: 'Pratos descartáveis', description: '15 cm de diâmetro', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
        { id: 'desc4', name: 'Sacos para hot dog', description: '', price: 1.50, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
        { id: 'desc5', name: 'Guardanapo', description: '', price: 2.50, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
        { id: 'desc6', name: 'Pratos descartáveis 21', description: '', price: 3.50, complements: 0, img: 'https://via.placeholder.com/80?text=Descart%C3%A1vel' },
    ]
};

// Mapeamento de chaves de categoria para nomes exibíveis
const categoryDisplayNames = {
    salgados: 'SALGADOS',
    hamburguer: 'HAMBÚRGUER',
    sucos_e_vitaminas: 'SUCOS E VITAMINAS',
    refrigerantes: 'REFRIGERANTES',
    energeticos: 'ENERGÉTICOS',
    bombons: 'BOMBONS E DOCES',
    sorvetes_e_picoles: 'SORVETES E PICOLÉS',
    cervejas: 'CERVEJAS',
    mercado: 'MERCADO',
    frios: 'FRIOS',
    higiene_e_limpeza: 'HIGIENE E LIMPEZA',
    outros_produtos: 'OUTROS PRODUTOS',
    descartaveis: 'DESCARTÁVEIS'
};

// Estrutura de dados para os cards de categoria com imagens
const allCategories = {
    salgados: { name: 'Salgados', img: '/icons/salgados.png' },
    hamburguer: { name: 'Hambúrguer', img: '/icons/hamb.png' },
    sucos_e_vitaminas: { name: 'Sucos e Vitaminas', img: '/icons/sucos.png' },
    refrigerantes: { name: 'Refrigerantes', img: '/icons/refri.png' },
    energeticos: { name: 'Energéticos', img: '/icons/energ.png' },
    bombons: { name: 'Bombons e Doces', img: '/icons/bombom.png' },
    sorvetes_e_picoles: { name: 'Sorvetes e Picolés', img: '/icons/sorvete.png' },
    cervejas: { name: 'Cervejas', img: '/icons/cerveja.png' },
    mercado: { name: 'Mercado', img: '/icons/mercado.png' },
    frios: { name: 'Frios', img: '/icons/frios.png' },
    higiene_e_limpeza: { name: 'Higiene e Limpeza', img: '/icons/limpeza.png' },
    outros_produtos: { name: 'Outros Produtos', img: '/icons/outros.png' },
    descartaveis: { name: 'Descartáveis', img: '/icons/descartaveis.png' }
};


// Funções utilitárias para buscar produto por ID
function getProductById(productId) {
    for (const categoryKey in allProducts) {
        const product = allProducts[categoryKey].find(p => p.id === productId);
        if (product) {
            return product;
        }
    }
    return null;
}

const complements = {
    alface: { name: 'Alface', price: 0, category: 'gratis' },
    tomate: { name: 'Tomate', price: 0, category: 'gratis' },
    cebola: { name: 'Cebola', price: 0, category: 'gratis' },
    maionese_verde: { name: 'Maionese Verde', price: 0, category: 'gratis' },
    ketchup: { name: 'Ketchup', price: 0, category: 'gratis' },
    mostarda: { name: 'Mostarda', price: 0, category: 'gratis' },
    
    molho_picante: { name: 'Molho Picante', price: 0, category: 'molho_gratis' },
    molho_rose: { name: 'Molho Rosé', price: 0, category: 'molho_gratis' },

    bacon_extra: { name: 'Bacon Extra', price: 5, category: 'adicional_pago' },
    queijo_extra: { name: 'Queijo Extra', price: 5, category: 'adicional_pago' },
    ovo: { name: 'Ovo', price: 5, category: 'adicional_pago' },

    catupiry: { name: 'Catupiry', price: 4, category: 'recheio_extra_pastel' },
    cheddar: { name: 'Cheddar', price: 4, category: 'recheio_extra_pastel' }
};

// Variáveis de estado
let selectedProductForComplements = null;
let selectedComplements = new Set();
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let complementsScrollListener = null;

// Inicializado como nulo para mostrar os cards de categoria primeiro
let currentVisibleCategory = null; 
const productsListMain = document.getElementById('products-list-main');
const mainSearchInput = document.getElementById('main-search-input');
const categoryCardsGrid = document.getElementById('category-cards-grid'); 

// =========================================================
// VARIÁVEIS DE ELEMENTOS GLOBAIS
// =========================================================
const modalCustomerNameInput = document.getElementById('modal-customer-name');
const modalDeliveryCheckbox = document.getElementById('modal-delivery-checkbox');
const modalPickupCheckbox = document.getElementById('modal-pickup-checkbox');
const modalDeliveryAddressSection = document.getElementById('modal-delivery-address-section');
const modalDeliveryAddressInput = document.getElementById('modal-delivery-address');

const modalTrocoSection = document.getElementById('modal-troco-section');
const modalTrocoValueInput = document.getElementById('modal-troco-value');

// Novos elementos do HTML para as seções de pagamento
const onlinePaymentSection = document.getElementById('online-payment-section');
const whatsappPaymentSection = document.getElementById('whatsapp-payment-section');
const modalOnlinePaymentBtn = document.getElementById('modal-online-payment-btn');
const modalConfirmWhatsappBtn = document.getElementById('modal-confirm-whatsapp-btn');

// Elementos para exibir os detalhes do Pix
const pixPaymentDetailsDiv = document.getElementById('pixPaymentDetails');
const pixQrCodeImage = document.getElementById('pixQrCodeImage');
const pixCopiaEColaInput = document.getElementById('pixCopiaEColaInput');
const copyPixCodeBtn = document.getElementById('copyPixCodeBtn');

// Novos campos para nome e email do comprador online
const modalBuyerInfoSection = document.getElementById('modal-buyer-info-section');
// Removido: const modalBuyerNameInput = document.getElementById('modal-buyer-name');
const modalBuyerEmailInput = document.getElementById('modal-buyer-email');


// =========================================================
// FUNÇÕES DE PAGAMENTO ONLINE (MERCADO PAGO)
// =========================================================

async function initiateOnlinePayment() {
    // Esconde as seções de escolha de pagamento e os campos de comprador online
    if (onlinePaymentSection) onlinePaymentSection.style.display = 'none';
    if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'none';
    if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'none'; // Esconde a seção de dados do comprador

    // Esconde as seções de detalhes de pagamento online (Pix e Bricks)
    if (pixPaymentDetailsDiv) pixPaymentDetailsDiv.style.display = 'none';
    const paymentBricksContainer = document.getElementById('payment-bricks-container');
    if (paymentBricksContainer) paymentBricksContainer.style.display = 'none';

    // 1. Valida os campos obrigatórios (nome do pedido, entrega)
    const isValid = validateOrder(true); 
    if (!isValid) {
        showCustomAlert("Por favor, preencha seu nome e a opção de entrega antes de continuar.", "error");
        // Reverte a visibilidade dos elementos se a validação falhar
        if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
        if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
        return;
    }

    // 2. Valida se um método de pagamento ONLINE foi selecionado
    const selectedOnlinePaymentMethod = document.querySelector('input[name="modal-payment"]:checked')?.value;
    if (!selectedOnlinePaymentMethod || !selectedOnlinePaymentMethod.startsWith('online-')) {
        showCustomAlert("Por favor, selecione uma opção de pagamento online (Pix ou Cartão).", "error");
        if (onlinePaymentSection) highlightField('online-payment-section'); // Destaca a seção correta
        if (modalOnlinePaymentBtn) shakeButton(modalOnlinePaymentBtn);
        // Reverte a visibilidade dos elementos
        if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
        if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
        return;
    }

    // 3. Valida o campo de e-mail do comprador online
    const customerName = modalCustomerNameInput?.value.trim(); // Usa o nome do campo geral
    const buyerEmail = modalBuyerEmailInput?.value.trim();

    if (!buyerEmail || !isValidEmail(buyerEmail)) {
        showCustomAlert("Por favor, preencha um e-mail válido para o pagamento online.", "error");
        if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'block'; // Mostra a seção de dados do comprador
        highlightField('modal-buyer-email');
        // Reverte a visibilidade dos elementos
        if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
        if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
        return;
    }


    // 4. Mostra uma mensagem de "carregando"
    if (modalOnlinePaymentBtn) {
        modalOnlinePaymentBtn.textContent = 'Aguarde, preparando pagamento...';
        modalOnlinePaymentBtn.disabled = true;
    }

    const totalValue = parseFloat(document.getElementById('modal-total-price').innerText.replace('R$ ', '').replace(',', '.')) || 0;
    
    try {
        if (selectedOnlinePaymentMethod === 'online-pix') {
            console.log("Iniciando pagamento Pix online...");
            const response = await fetch(`${BACKEND_URL}/create-mercadopago-pix`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: customerName, // Usa o nome do campo geral
                    customerEmail: buyerEmail, // Usa o email do comprador online
                    items: cart.map(item => {
                        const product = getProductById(item.productId);
                        if (!product) return null;
                        let itemTotal = product.price;
                        const complementNames = item.complements.map(id => {
                            const comp = complements[id];
                            if (comp) {
                                itemTotal += comp.price;
                                return comp.name;
                            }
                            return '';
                        }).filter(Boolean);
                        return {
                            title: product.name + (complementNames.length > 0 ? ` (${complementNames.join(', ')})` : ''),
                            quantity: 1,
                            unit_price: parseFloat(itemTotal.toFixed(2))
                        };
                    }).filter(Boolean),
                    total: totalValue
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro do backend ao criar Pix:", errorData);
                throw new Error(`Falha ao criar pagamento Pix: ${errorData.message || response.statusText}`);
            }

            const pixPaymentData = await response.json();
            
            // Exibir os detalhes do Pix
            if (pixPaymentDetailsDiv && pixQrCodeImage && pixCopiaEColaInput && copyPixCodeBtn) {
                pixQrCodeImage.src = pixPaymentData.qrCodeImage;
                pixCopiaEColaInput.value = pixPaymentData.pixCopiaECola;
                pixPaymentDetailsDiv.style.display = 'block';

                copyPixCodeBtn.onclick = () => {
                    pixCopiaEColaInput.select();
                    navigator.clipboard.writeText(pixCopiaEColaInput.value)
                        .then(() => { showCustomAlert('Código Pix copiado com sucesso!', 'success'); })
                        .catch(err => { console.error('Erro ao copiar Pix:', err); showCustomAlert('Falha ao copiar o código Pix.', 'error'); });
                };
            }
            showCustomAlert("QR Code Pix gerado com sucesso!", "success");

        } else if (selectedOnlinePaymentMethod === 'online-card') {
            console.log("Pagamento com Cartão online selecionado. NOTA: O backend precisa fornecer uma 'preferenceId' para o Brick de Cartão.");
            
            showCustomAlert("O pagamento com Cartão Online está em desenvolvimento e requer configuração adicional no backend para usar os Bricks. Por favor, utilize o Pix Online ou as opções via WhatsApp.", "warning");
            
            // Reverte a visibilidade dos elementos se o fluxo não for implementado
            if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
            if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
            if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'block'; // Mostra a seção de dados do comprador

        } else {
            // Este bloco não deve ser atingido se a validação acima funcionar
            showCustomAlert("Por favor, selecione um método de pagamento online (Pix ou Cartão).", "error");
            if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
            if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
            if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'block'; // Mostra a seção de dados do comprador
        }

    } catch (error) {
        console.error("Erro ao iniciar pagamento online:", error);
        showCustomAlert(`Erro ao iniciar pagamento online: ${error.message}`, "error");
        // Reverte a visibilidade dos elementos se houver erro
        if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
        if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
        if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'block'; // Mostra a seção de dados do comprador
    } finally {
        if (modalOnlinePaymentBtn) {
            modalOnlinePaymentBtn.textContent = 'Pagar Online Agora';
            // Permanece desabilitado ou habilitado baseado na seleção após o erro
            const currentSelected = document.querySelector('input[name="modal-payment"]:checked')?.value;
            modalOnlinePaymentBtn.disabled = !currentSelected || !currentSelected.startsWith('online-');
        }
    }
}

// Função para validar formato de e-mail básico
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Função para renderizar APENAS o Brick de Cartão de Crédito (requer preferenceId do backend)
async function renderCardPaymentBrick(amount, preferenceId) {
    if (cardPaymentBrickController) {
        await cardPaymentBrickController.unmount();
        cardPaymentBrickController = null;
    }

    const bricksBuilder = mp.bricks();

    const cardSettings = {
        initialization: {
            amount: amount,
            preferenceId: preferenceId,
        },
        customization: {
            visual: { style: { theme: 'dark' } },
        },
        callbacks: {
            onSubmit: async (cardFormData) => {
                try {
                    // Esta chamada é para a rota /create-mercadopago-card do seu backend
                    const paymentResponse = await fetch(`${BACKEND_URL}/create-mercadopago-card`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cardFormData)
                    });
                    const data = await paymentResponse.json();
                    
                    if (data.status === 'approved' || (data.body && data.body.status === 'approved')) {
                        showCustomAlert("Pagamento Aprovado! Obrigado pela sua compra.", "success");
                        clearCart();
                        setTimeout(() => closeCartModal(), 2000); 
                    } else {
                        const errorMessage = data.message || (data.body && data.body.message) || "Pagamento recusado.";
                        showCustomAlert(`O pagamento foi recusado. Motivo: ${errorMessage}`, "error");
                    }
                } catch (error) {
                    console.error("Erro ao processar pagamento com cartão no frontend:", error);
                    showCustomAlert("Ocorreu um erro ao processar seu pagamento com cartão. Tente novamente.", "error");
                }
            },
            onError: (error) => {
                console.error("Erro no Card Payment Brick:", error);
                showCustomAlert("Erro no formulário do cartão. Verifique os dados.", "error");
            },
        },
    };
    // Verifica se o container existe antes de criar o brick
    if (document.getElementById('cardPaymentBrick_container')) {
        cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', cardSettings);
    } else {
        console.error("Elemento 'cardPaymentBrick_container' não encontrado para renderizar o Brick de Cartão.");
    }
}


// =========================================================
// FUNÇÕES DE ALERTA PERSONALIZADO
// =========================================================
function showCustomAlert(message, type = '') {
    const alertOverlay = document.getElementById('custom-alert-overlay');
    const alertBox = document.getElementById('custom-alert-box');
    const alertMessage = document.getElementById('custom-alert-message');
    
    if (alertOverlay && alertMessage && alertBox) {
        alertMessage.textContent = message;
        alertOverlay.classList.add('is-visible');
        document.body.classList.add('modal-open');

        alertBox.className = 'custom-alert-box'; // Reseta as classes
        if (type) {
            alertBox.classList.add(type);
        }
    }
}

function closeCustomAlert() {
    const alertOverlay = document.getElementById('custom-alert-overlay');
    if (alertOverlay) {
        alertOverlay.classList.remove('is-visible');
        toggleModal('custom-alert-overlay', false); 
    }
}

// =========================================================
// ANIMAÇÕES DE DESTAQUE E TREMOR
// =========================================================
function highlightField(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('highlight-error');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function removeHighlightField(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('highlight-error');
        const parentLabel = document.querySelector(`label[for="${elementId}"]`);
        if (parentLabel) parentLabel.classList.remove('highlight-error');
        // Remove highlighting from parent sections as well if they were highlighted
        const parentSection = element.closest('.payment-section') || element.closest('.delivery-section') || element.closest('.form-section');
        if (parentSection) parentSection.classList.remove('highlight-error');
    }
}

function shakeButton(buttonElement) {
    if (buttonElement) {
        buttonElement.classList.add('shake-animation');
        buttonElement.addEventListener('animationend', () => {
            buttonElement.classList.remove('shake-animation');
        }, { once: true });
    }
}


// --- FUNÇÕES GERAIS DE MODAL ---
function toggleModal(modalId, show) {
    const modalOverlay = document.getElementById(modalId);
    if (modalOverlay) {
        if (show) {
            modalOverlay.classList.add('is-visible');
            document.body.classList.add('modal-open');
        } else {
            modalOverlay.classList.remove('is-visible');
            const cartModal = document.getElementById('cart-modal-overlay');
            const complementsModal = document.getElementById('complements-modal-overlay');
            const customAlert = document.getElementById('custom-alert-overlay');

            const anyOtherModalStillVisible = 
                (cartModal && cartModal.classList.contains('is-visible')) ||
                (complementsModal && complementsModal.classList.contains('is-visible')) ||
                (customAlert && customAlert.classList.contains('is-visible'));

            if (!anyOtherModalStillVisible) {
                document.body.classList.remove('modal-open');
            }
        }
    }
}

// --- FUNÇÕES DO MODAL DO CARRINHO ---
function openCartModal() {
    console.log("Abrindo modal do carrinho...");
    renderModalCart();

    // Mostra as seções de escolha de pagamento e desabilita os botões de ação inicialmente
    if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
    if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
    if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'none'; // Esconde os campos de comprador online inicialmente
    
    if (modalOnlinePaymentBtn) modalOnlinePaymentBtn.disabled = true;
    if (modalConfirmWhatsappBtn) modalConfirmWhatsappBtn.disabled = true;

    // Esconde as seções de detalhes de pagamento online (Pix e Bricks)
    if (pixPaymentDetailsDiv) pixPaymentDetailsDiv.style.display = 'none';
    const paymentBricksContainer = document.getElementById('payment-bricks-container');
    if (paymentBricksContainer) paymentBricksContainer.style.display = 'none';


    toggleModal('cart-modal-overlay', true);
}

function closeCartModal() {
    console.log("Fechando modal do carrinho...");
    toggleModal('cart-modal-overlay', false);
    // Assegura que as seções de pagamento estejam visíveis para a próxima abertura e resetadas
    if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
    if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
    if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'none'; // Esconde os campos de comprador online ao fechar
    
    if (modalOnlinePaymentBtn) modalOnlinePaymentBtn.disabled = true;
    if (modalConfirmWhatsappBtn) modalConfirmWhatsappBtn.disabled = true;

    if (pixPaymentDetailsDiv) pixPaymentDetailsDiv.style.display = 'none';
    const paymentBricksContainer = document.getElementById('payment-bricks-container');
    if (paymentBricksContainer) paymentBricksContainer.style.display = 'none';
    
    // Limpa a seleção de rádio buttons
    document.querySelectorAll('input[name="modal-payment"]').forEach(input => input.checked = false);
    updatePaymentSelectionVisual(); // Remove a classe 'selected' visualmente
}

// --- FUNÇÕES DO MODAL DE CATEGORIAS REMOVIDAS ---

function selectCategory(categoryId) {
    console.log('Categoria selecionada:', categoryId);
    currentVisibleCategory = categoryId;
    renderMainProducts(categoryId);
    mainSearchInput.value = '';
    
    const productsListSection = document.getElementById('products-list-main');
    if (productsListSection) {
        productsListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


// ======== FUNÇÕES RELACIONADAS ÀS CATEGORIAS NA PÁGINA DE CATEGORIAS ========
function renderCategoryCards() {
    const categoryCardsSection = document.querySelector('.category-cards-section');
    if (categoryCardsSection) {
        categoryCardsSection.style.display = 'block'; 
    }

    if (categoryCardsGrid) { 
        categoryCardsGrid.innerHTML = '';
        for (const categoryKey in allCategories) {
            const categoryInfo = allCategories[categoryKey];
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('category-card');
            cardDiv.onclick = () => selectCategory(categoryKey); // Reutilizando a função de seleção

            cardDiv.innerHTML = `
                <img src="${categoryInfo.img}" alt="${categoryInfo.name}" class="category-card-img" />
                <span class="category-card-name">${categoryInfo.name}</span>
            `;
            categoryCardsGrid.appendChild(cardDiv);
        }
    }
}

// Função para mostrar a página de categorias (antiga página inicial)
function showCategoriesPage() {
    currentVisibleCategory = null; 
    renderCategoryCards(); 
    productsListMain.innerHTML = ''; 
    productsListMain.style.display = 'none';
    mainSearchInput.value = ''; 

    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
    const categoriesNavItem = document.querySelector('.bottom-nav .nav-item:nth-child(2)');
    if (categoriesNavItem) {
        categoriesNavItem.classList.add('active');
    }

    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}


// ======== FUNÇÃO PARA RENDERIZAR A NOVA PÁGINA INICIAL ========
function renderNewHomePage() {
    // 1. Resetar a visualização
    const categoryCardsGrid = document.getElementById('category-cards-grid');
    const productsListMain = document.getElementById('products-list-main');
    const categoryCardsSection = document.querySelector('.category-cards-section');

    if (categoryCardsGrid) {
        categoryCardsGrid.innerHTML = '';
    }
    if (categoryCardsSection) {
        categoryCardsSection.style.display = 'none'; // Esconde a área dos cards de categoria
    }
    if (productsListMain) {
        productsListMain.innerHTML = ''; // Limpa a lista de produtos
        productsListMain.style.display = 'block'; // Garante que a lista de produtos está visível
    }
    
    // 2. Atualizar o estado ativo da navegação
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
    const homeNavItem = document.querySelector('.bottom-nav .nav-item:first-child');
    if (homeNavItem) {
        homeNavItem.classList.add('active');
    }

    // 3. Definir os produtos a serem exibidos
    const houseRecsIds = ['hamburguer13', 'cerveja16', 'salgado20', 'hamburguer10'];
    const beerIds = ['cerveja8', 'cerveja7', 'cerveja3'];
    const pastelIds = ['salgado1', 'salgado5', 'salgado3'];

    // 4. Função auxiliar para renderizar uma seção inteira
    const renderProductSection = (title, productIds) => {
        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'product-group-title';
        sectionTitle.textContent = title;
        productsListMain.appendChild(sectionTitle);

        productIds.forEach(id => {
            const product = getProductById(id);
            if (product) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('product-item');
                itemDiv.setAttribute('data-product-id', product.id);
                itemDiv.onclick = () => handleProductClick(product.id);

                const imgSrc = product.img && product.img !== '' ? product.img : `https://via.placeholder.com/80?text=${encodeURIComponent(product.name.substring(0,8))}`;

                itemDiv.innerHTML = `
                    <img src="${imgSrc}" alt="${product.name}" class="product-item-img" />
                    <div class="product-item-details">
                        <h4>${product.name}</h4>
                        <p>${product.description || ''}</p>
                    </div>
                    <div class="product-item-right">
                        <span class="product-item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <button class="add-to-cart-btn">+</button>
                    </div>
                `;
                productsListMain.appendChild(itemDiv);
            }
        });
    };
    
    // 5. Renderizar todas as seções
    renderProductSection('⭐ Recomendações da Casa', houseRecsIds);
    renderProductSection('🍺 Cervejas Mais Pedidas', beerIds);
    renderProductSection('🥟 Pastéis Tradicionais', pastelIds);

    // 6. Rolar para o topo
    window.scrollTo(0, 0);
}


// --- FUNÇÕES PARA RENDERIZAR PRODUTOS NA PÁGINA PRINCIPAL ---
function renderMainProducts(categoryKey) {
    if (categoryCardsGrid) { 
        categoryCardsGrid.innerHTML = '';
        const categoryCardsSection = document.querySelector('.category-cards-section');
        if (categoryCardsSection) categoryCardsSection.style.display = 'none'; 
    }

    productsListMain.innerHTML = '';
    productsListMain.style.display = 'block';
    const products = allProducts[categoryKey];

    if (!products || products.length === 0) {
        productsListMain.innerHTML = `<p style="text-align: center; color: var(--color-text-light); padding: 20px;">Nenhum produto nesta categoria.</p>`;
        return;
    }

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('product-group-title');
    categoryTitle.textContent = categoryDisplayNames[categoryKey] || categoryKey.replace(/_/g, ' ').toUpperCase();
    productsListMain.appendChild(categoryTitle);

    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('product-item');
        itemDiv.setAttribute('data-product-id', product.id);
        itemDiv.onclick = () => handleProductClick(product.id);

        const imgSrc = product.img && product.img !== '' ? product.img : `https://via.placeholder.com/80?text=${encodeURIComponent(product.name.substring(0,8))}`;

        itemDiv.innerHTML = `
            <img src="${imgSrc}" alt="${product.name}" class="product-item-img" />
            <div class="product-item-details">
                <h4>${product.name}</h4>
                <p>${product.description || ''}</p>
            </div>
            <div class="product-item-right">
                <span class="product-item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button class="add-to-cart-btn">+</button>
            </div>
        `;
        productsListMain.appendChild(itemDiv);
    });
}

function handleProductClick(productId) {
    const productInfo = getProductById(productId);
    if (!productInfo) {
        console.error("Produto não encontrado para clique:", productId);
        return;
    }

    console.log(`Clicado no produto: ${productInfo.name}, Complements: ${productInfo.complements}`);

    if (productInfo.complements && productInfo.complements > 0) {
        selectedProductForComplements = productId;
        console.log("Condição de complementos atendida. Abrindo modal de complementos...");
        openComplementsModal();
    } else {
        console.log("Produto sem complementos ou complementos = 0. Adicionando direto ao carrinho.");
        cart.push({
            productId: productId,
            complements: [] 
        });
        saveCart();
        updateTotal();
        updateCartCount();
        showCustomAlert(`${productInfo.name} adicionado ao carrinho!`);
        openCartModal();
    }
}

// --- FUNÇÕES DO MODAL DE COMPLEMENTOS ---
function checkComplementsScrollPosition() {
    const scrollArea = document.querySelector('.complements-scroll-area');
    const actionButtons = document.querySelector('.complement-modal-actions');
    if (!scrollArea || !actionButtons) return;

    if (scrollArea.scrollHeight <= scrollArea.clientHeight) {
        actionButtons.classList.add('is-scrolled-to-bottom');
        return;
    }
    const scrolledToBottom = (scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 5);
    if (scrolledToBottom) {
        actionButtons.classList.add('is-scrolled-to-bottom');
    } else {
        actionButtons.classList.remove('is-scrolled-to-bottom');
    }
}

function setupComplementsModalScrollListener() {
    const scrollArea = document.querySelector('.complements-scroll-area');
    if (scrollArea) {
        if (complementsScrollListener) {
            scrollArea.removeEventListener('scroll', complementsScrollListener);
        }
        complementsScrollListener = checkComplementsScrollPosition;
        scrollArea.addEventListener('scroll', complementsScrollListener);
        checkComplementsScrollPosition();
    }
}

function cleanupComplementsModalScrollListener() {
    const scrollArea = document.querySelector('.complements-scroll-area');
    const actionButtons = document.querySelector('.complement-modal-actions');
    if (scrollArea && complementsScrollListener) {
        scrollArea.removeEventListener('scroll', complementsScrollListener);
        complementsScrollListener = null;
    }
    if (actionButtons) {
        actionButtons.classList.remove('is-scrolled-to-bottom');
    }
}

function openComplementsModal() {
    console.log("Função openComplementsModal() chamada.");
    document.querySelectorAll('input[data-complement-id]').forEach(input => {
        input.checked = false;
    });
    selectedComplements.clear(); 

    toggleModal('complements-modal-overlay', true);

    const product = getProductById(selectedProductForComplements);
    
    document.querySelectorAll('.complement-category').forEach(cat => cat.style.display = 'block');

    if (product) {
        console.log("Product in complements modal:", product.name, "Free complements:", product.complements);

        if (product.id.startsWith('hamburguer') && product.complements > 0) {
            document.getElementById('complement-limit-info-modal').innerText = `Escolha até ${product.complements} adicionais grátis para este hambúrguer`;
            document.querySelector('.complement-category:has(#molho_picante)').style.display = 'none';
            document.querySelector('.complement-category:has(#catupiry)').style.display = 'none';
        } 
        else if (product.id.startsWith('salgado') && product.complements > 0) {
            document.getElementById('complement-limit-info-modal').innerText = `Escolha até ${product.complements} molhos grátis para este pastel`;
            document.querySelector('.complement-category:has(#alface)').style.display = 'none';
            document.querySelector('.complement-category:has(#bacon_extra)').style.display = 'none';
        }
        else {
            document.getElementById('complement-limit-info-modal').innerText = `Este item não possui adicionais.`;
            document.querySelectorAll('.complement-category').forEach(cat => cat.style.display = 'none');
        }

    } else {
        document.getElementById('complement-limit-info-modal').innerText = `Erro: Produto não encontrado.`;
    }

    setTimeout(setupComplementsModalScrollListener, 100);
}


function closeComplementsModal() {
    console.log("Fechando modal de complementos...");
    toggleModal('complements-modal-overlay', false);
    cleanupComplementsModalScrollListener();
}


function toggleComplement(id, checked) {
    if (!selectedProductForComplements) return;
    const product = getProductById(selectedProductForComplements);
    const comp = complements[id];
    if (!comp) return;

    console.log(`Toggle Complement: ${comp.name}, Checked: ${checked}`);

    if (checked) {
        if (comp.category === 'gratis' && product.id.startsWith('hamburguer')) {
            const currentGratis = Array.from(selectedComplements).filter(cid => complements[cid].category === 'gratis');
            if (currentGratis.length >= product.complements) {
                showCustomAlert(`Você só pode escolher até ${product.complements} adicionais grátis para este hambúrguer.`, 'error');
                document.getElementById(id).checked = false;
                return;
            }
        } else if (comp.category === 'molho_gratis' && product.id.startsWith('salgado')) {
            const currentMolhosGratis = Array.from(selectedComplements).filter(cid => complements[cid].category === 'molho_gratis');
            if (currentMolhosGratis.length >= product.complements) {
                showCustomAlert(`Você só pode escolher até ${product.complements} molhos grátis para este pastel.`, 'error');
                document.getElementById(id).checked = false;
                return;
            }
        }
        
        selectedComplements.add(id);
    } else {
        selectedComplements.delete(id);
    }
}


function confirmComplementsAndAddToCart() {
    if (!selectedProductForComplements) {
        console.error("Nenhum produto selecionado para adicionar ao carrinho.");
        return; 
    }

    const productInfo = getProductById(selectedProductForComplements);

    cart.push({
        productId: selectedProductForComplements,
        complements: Array.from(selectedComplements)
    });
    saveCart();
    updateTotal();
    updateCartCount();
    closeComplementsModal();
    showCustomAlert(`${productInfo.name} com adicionais adicionado ao carrinho!`);
    openCartModal();
}

function cancelComplementsSelection() {
    console.log("Cancelando seleção de complementos.");
    selectedProductForComplements = null;
    selectedComplements.clear();
    document.querySelectorAll('input[data-complement-id]').forEach(input => input.checked = false);
    closeComplementsModal();
}

// --- PERSISTÊNCIA DO CARRINHO NO LOCALSTORAGE ---
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --- FUNÇÕES DE RENDERIZAÇÃO E ATUALIZAÇÃO DE TOTAIS ---
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
        cartCountEl.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function updateModalTotal() {
    const modalTotalEl = document.getElementById('modal-total-price');
    if (!modalTotalEl) return;
    let total = 0;
    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            total += product.price;
            item.complements.forEach(id => {
                if (complements[id]) {
                    total += complements[id].price;
                }
            });
        } else {
            console.warn("Produto no carrinho não encontrado na lista de produtos para o modal:", item.productId);
        }
    });
    modalTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function renderCart() {
    validateOrder(false);
    updateCartCount();
}

function renderModalCart() {
    console.log("--- INICIANDO RENDERIZAÇÃO DO CARRINHO ---"); // Log de início

    const list = document.getElementById('cart-modal-list');
    if (!list) {
        console.error("ERRO CRÍTICO: O elemento da lista com ID 'cart-modal-list' não foi encontrado no HTML.");
        return;
    }
    console.log("Elemento da lista 'cart-modal-list' encontrado com sucesso.");

    // Vamos ver como está o array do carrinho neste exato momento
    console.log("Conteúdo do carrinho (array 'cart'):", JSON.parse(JSON.stringify(cart)));

    if (cart.length === 0) {
        console.log("O carrinho está vazio. Exibindo mensagem de carrinho vazio.");
        list.innerHTML = `<li class="cart-empty-message">Seu carrinho está vazio.</li>`;
    } else {
        console.log(`O carrinho tem ${cart.length} item(ns). Começando o loop para exibi-los...`);
        list.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

        cart.forEach((item, index) => {
            console.log(`Processando item ${index + 1}:`, item);
            const product = getProductById(item.productId);

            if (product) {
                console.log(` -> Produto encontrado: ${product.name}`);
                const li = document.createElement('li');
                li.className = 'cart-item';

                // A lógica de preço e complementos continua a mesma
                let complementsTotalPrice = 0;
                const complementNames = item.complements.map(id => {
                    const compInfo = complements[id];
                    if (compInfo) {
                        complementsTotalPrice += compInfo.price;
                        return compInfo.name;
                    }
                    return '';
                }).filter(Boolean).join(", ");

                li.innerHTML = `
                    <div class="cart-item-details">
                        <p class="item-name">${product.name}</p>
                        ${complementNames ? `<small class="item-complements">+ ${complementNames}</small>` : ''}
                    </div>
                    <div class="cart-item-price">
                        R$ ${(product.price + complementsTotalPrice).toFixed(2).replace('.', ',')}
                    </div>
                    <button class="remove-item-btn" onclick="removeItemFromCart(${index})">&times;</button>
                `;
                list.appendChild(li);
                console.log(` -> Item '${product.name}' adicionado à lista do modal.`);
            } else {
                console.error(` -> ERRO: Produto com ID '${item.productId}' não foi encontrado!`);
            }
        });
    }

    console.log("--- RENDERIZAÇÃO DO CARRINHO FINALIZADA ---");
    updateModalTotal();
    updatePaymentSelectionVisual();
}

// --- FUNÇÃO PARA REMOVER ITEM DO CARRINHO ---
function removeItemFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateTotal();
    updateCartCount();
    renderModalCart();
    validateOrder(false);
}

// --- FUNÇÃO PARA ATUALIZAR O TOTAL GLOBAL ---
function updateTotal() {
    console.log("Atualizando total...");
    let currentTotal = 0;

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            currentTotal += product.price;
            item.complements.forEach(id => {
                const compInfo = complements[id];
                if (compInfo) {
                    currentTotal += compInfo.price;
                }
            });
        } else {
            console.warn("Produto no carrinho (via item.productId) não encontrado na lista de produtos para updateTotal:", item.productId);
        }
    });

    if (modalDeliveryCheckbox?.checked) {
        currentTotal += 2;
    }

    const modalTotalPriceElement = document.getElementById('modal-total-price');
    if (modalTotalPriceElement) {
        modalTotalPriceElement.textContent = `R$ ${currentTotal.toFixed(2).replace('.', ',')}`;
    }
    
    updateModalTotal(); 
}

// --- FUNÇÕES DE ENTREGA E PAGAMENTO (no contexto do modal) ---
function handleDeliveryChange(checkbox) {
    if (checkbox.checked) {
        if (modalPickupCheckbox) modalPickupCheckbox.checked = false;
        if (modalDeliveryAddressSection) {
            modalDeliveryAddressSection.style.display = 'block';
            if (modalDeliveryAddressInput) {
                modalDeliveryAddressInput.removeEventListener('input', updateUI); 
                modalDeliveryAddressInput.addEventListener('input', updateUI);
            }
        }
    } else {
        if (modalDeliveryAddressSection) {
            modalDeliveryAddressSection.style.display = 'none';
            if (modalDeliveryAddressInput) {
                modalDeliveryAddressInput.removeEventListener('input', updateUI);
            }
        }
    }
    updateUI(); 
    removeHighlightField('modal-delivery-options-wrapper');
    removeHighlightField('modal-delivery-address-section');
}

function handlePickupChange(checkbox) {
    if (checkbox.checked) {
        if (modalDeliveryCheckbox) modalDeliveryCheckbox.checked = false;
        if (modalDeliveryAddressSection) {
            modalDeliveryAddressSection.style.display = 'none';
            if (modalDeliveryAddressInput) {
                modalDeliveryAddressInput.removeEventListener('input', updateUI);
            }
        }
    }
    updateUI(); 
    removeHighlightField('modal-delivery-options-wrapper');
    removeHighlightField('modal-delivery-address-section');
}

function selectPaymentMethod(method) {
    // Desseleciona todos os cartões de pagamento
    document.querySelectorAll('#cart-modal-content .payment-card').forEach(el => {
        el.classList.remove('selected');
        const radio = el.querySelector('input[name="modal-payment"]');
        if (radio && radio.value !== method) { // Desmarca o rádio se não for o método atual
            radio.checked = false;
        }
    });

    // Seleciona o cartão clicado
    const clickedCard = document.querySelector(`#cart-modal-content .payment-card[data-method="${method}"]`);
    if (clickedCard) {
        clickedCard.classList.add('selected');
        const radioInput = clickedCard.querySelector('input[name="modal-payment"]');
        if (radioInput) {
            radioInput.checked = true;
        }
    }

    // Gerencia a visibilidade da seção de troco
    if (modalTrocoSection) {
        modalTrocoSection.style.display = method === "whatsapp-especie" ? "block" : "none";
    }

    // Gerencia a visibilidade da seção de dados do comprador online
    if (modalBuyerInfoSection) {
        modalBuyerInfoSection.style.display = method.startsWith('online-') ? "block" : "none";
    }

    // Habilita/desabilita os botões de ação com base na seleção
    if (modalOnlinePaymentBtn) modalOnlinePaymentBtn.disabled = !method.startsWith('online-');
    if (modalConfirmWhatsappBtn) modalConfirmWhatsappBtn.disabled = !method.startsWith('whatsapp-');

    // Remove qualquer destaque de erro das seções de pagamento e campos
    if (onlinePaymentSection) removeHighlightField('online-payment-section');
    if (whatsappPaymentSection) removeHighlightField('whatsapp-payment-section');
    removeHighlightField('modal-troco-value'); 
    // Removido: removeHighlightField('modal-buyer-name');
    removeHighlightField('modal-buyer-email');

    updateTotal();
    validateOrder(false); 
    updatePaymentSelectionVisual(); 
}

function validateOrder(shouldHighlight = true) { 
    let isValid = true;
    let firstInvalidElement = null;

    // Limpa destaques de erro anteriores
    if (shouldHighlight) {
        document.querySelectorAll('.highlight-error').forEach(el => el.classList.remove('highlight-error'));
    }
    
    if (cart.length === 0) {
        isValid = false;
    }

    // O campo "Seu nome" (modal-customer-name) é obrigatório para todos os pedidos
    if (!modalCustomerNameInput?.value.trim()) {
        isValid = false;
        if (shouldHighlight) {
            highlightField('modal-customer-name');
            firstInvalidElement ||= modalCustomerNameInput;
        }
    }

    if (!modalDeliveryCheckbox?.checked && !modalPickupCheckbox?.checked) {
        isValid = false;
        const wrapper = document.getElementById('modal-delivery-options-wrapper');
        if (shouldHighlight && wrapper) {
            highlightField('modal-delivery-options-wrapper');
            firstInvalidElement ||= wrapper;
        }
    }

    if (modalDeliveryCheckbox?.checked && !modalDeliveryAddressInput?.value.trim()) {
        isValid = false;
        if (shouldHighlight) {
            highlightField('modal-delivery-address');
            firstInvalidElement ||= modalDeliveryAddressInput;
        }
    }

    // Rola para o primeiro elemento inválido se houver
    if (shouldHighlight && firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}


// --- FUNÇÃO FINAL DE CONFIRMAÇÃO E ENVIO DO PEDIDO (WHATSAPP) ---
async function confirmAllOrders() {
    // 1. Validação inicial comum (nome, entrega)
    let isValidCommon = validateOrder(true);
    if (!isValidCommon) {
        showCustomAlert("Por favor, preencha seu nome e a opção de entrega antes de enviar o pedido.", "error");
        if (modalConfirmWhatsappBtn) shakeButton(modalConfirmWhatsappBtn);
        return;
    }

    // 2. Validação específica para o método de pagamento WhatsApp
    const selectedPaymentRadio = document.querySelector('input[name="modal-payment"]:checked');
    if (!selectedPaymentRadio || !selectedPaymentRadio.value.startsWith('whatsapp-')) {
        showCustomAlert("Por favor, selecione uma forma de pagamento na seção 'Pagar pelo WhatsApp'.", "error");
        if (whatsappPaymentSection) highlightField('whatsapp-payment-section');
        if (modalConfirmWhatsappBtn) shakeButton(modalConfirmWhatsappBtn);
        return;
    }

    if (selectedPaymentRadio.value === 'whatsapp-especie' && modalTrocoValueInput.value.trim() !== '') {
        const totalPedidoElement = document.getElementById("modal-total-price");
        let totalPedido = parseFloat(totalPedidoElement.innerText.replace('R$ ', '').replace(',', '.'));
        const trocoPara = parseFloat(modalTrocoValueInput.value.replace(',', '.'));
        if (isNaN(trocoPara) || trocoPara < totalPedido) {
            showCustomAlert("O valor do troco não pode ser menor que o total do pedido.", "error");
            highlightField('modal-troco-value');
            if (modalConfirmWhatsappBtn) shakeButton(modalConfirmWhatsappBtn);
            return;
        }
    }

    // --- 3. PREPARAÇÃO DA MENSAGEM PARA O WHATSAPP ---
    const phoneNumber = "5511999999999"; // <-- IMPORTANTE: Troque pelo seu número com código do país (55) e DDD.

    let totalPedido = 0;
    let mensagem = `Olá! Gostaria de fazer um novo pedido:\n\n`;
    mensagem += `*Cliente:* ${modalCustomerNameInput.value.trim()}\n\n`; // Nome do cliente principal
    mensagem += `*ITENS DO PEDIDO:*\n`;

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            let itemPrice = product.price;
            let itemDescription = product.name;
            
            if (item.complements && item.complements.length > 0) {
                const complementNames = item.complements.map(complementId => {
                    const comp = complements[complementId];
                    if (comp) {
                        itemPrice += comp.price;
                        return comp.name;
                    }
                    return '';
                }).filter(Boolean);
                if (complementNames.length > 0) {
                    itemDescription += ` (+ ${complementNames.join(', ')})`;
                }
            }
            mensagem += `• ${itemDescription} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
            totalPedido += itemPrice;
        }
    });

    const deliveryType = modalDeliveryCheckbox.checked ? 'Entrega' : 'Retirada';
    if(deliveryType === 'Entrega') {
        totalPedido += 2; // Adiciona a taxa de entrega
    }

    const paymentMethodLabel = document.querySelector(`label[data-method="${selectedPaymentRadio.value}"] div`).textContent;

    mensagem += `\n*Tipo de Entrega:* ${deliveryType}\n`;
    if (deliveryType === 'Entrega') {
        mensagem += `*Endereço:* ${modalDeliveryAddressInput.value.trim()}\n`;
    }

    mensagem += `*Forma de Pagamento:* WhatsApp (${paymentMethodLabel})\n`;

    const trocoValue = modalTrocoValueInput.value.trim();
    if (selectedPaymentRadio.value === 'whatsapp-especie' && trocoValue) {
        mensagem += `*Troco para:* R$ ${parseFloat(trocoValue).toFixed(2).replace('.', ',')}\n`;
    }

    mensagem += `\n*TOTAL DO PEDIDO (com taxa): R$ ${totalPedido.toFixed(2).replace('.', ',')}*`;

    // --- 4. ABRIR O WHATSAPP ---
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Limpa o carrinho e fecha o modal
    clearCart();
}

// --- FUNÇÃO PARA LIMPAR TUDO ---
function clearCart() {
    cart.length = 0;
    saveCart();

    if (modalCustomerNameInput) modalCustomerNameInput.value = '';
    if (modalDeliveryAddressInput) modalDeliveryAddressInput.value = '';
    if (modalTrocoValueInput) modalTrocoValueInput.value = '';
    // Limpa o novo campo de email do comprador online
    if (modalBuyerEmailInput) modalBuyerEmailInput.value = '';
    
    if (modalDeliveryCheckbox) modalDeliveryCheckbox.checked = false;
    if (modalPickupCheckbox) modalPickupCheckbox.checked = false;
    document.querySelectorAll('input[name="modal-payment"]').forEach(input => input.checked = false);

    if (modalDeliveryAddressSection) modalDeliveryAddressSection.style.display = 'none';
    if (modalTrocoSection) modalTrocoSection.style.display = 'none';
    if (modalBuyerInfoSection) modalBuyerInfoSection.style.display = 'none'; // Esconde a seção de dados do comprador

    removeHighlightField('modal-customer-name');
    removeHighlightField('modal-delivery-options-wrapper');
    removeHighlightField('modal-delivery-address');
    if (onlinePaymentSection) removeHighlightField('online-payment-section');
    if (whatsappPaymentSection) removeHighlightField('whatsapp-payment-section');
    removeHighlightField('modal-troco-value');
    // Removido: removeHighlightField('modal-buyer-name');
    removeHighlightField('modal-buyer-email');
    
    // Reseta o estado e visibilidade das seções de pagamento
    if (onlinePaymentSection) onlinePaymentSection.style.display = 'block';
    if (whatsappPaymentSection) whatsappPaymentSection.style.display = 'block';
    if (pixPaymentDetailsDiv) pixPaymentDetailsDiv.style.display = 'none';
    const paymentBricksContainer = document.getElementById('payment-bricks-container');
    if (paymentBricksContainer) paymentBricksContainer.style.display = 'none';

    // Reseta o texto e estado dos botões de ação
    if (modalOnlinePaymentBtn) {
        modalOnlinePaymentBtn.textContent = 'Pagar Online Agora';
        modalOnlinePaymentBtn.disabled = true; 
    }
    if (modalConfirmWhatsappBtn) {
        modalConfirmWhatsappBtn.textContent = 'Enviar Pedido via WhatsApp';
        modalConfirmWhatsappBtn.disabled = true; 
    }
    
    updateTotal();
    updateCartCount();
    renderModalCart();
    closeCartModal();
}

// --- FUNÇÃO DE BUSCA NA PÁGINA PRINCIPAL ---
function filterProductsMainPage() {
    const filterText = mainSearchInput.value.toLowerCase();
    
    if (filterText !== '') {
        if (categoryCardsGrid) {
            categoryCardsGrid.innerHTML = ''; 
            const categoryCardsSection = document.querySelector('.category-cards-section');
            if (categoryCardsSection) categoryCardsSection.style.display = 'none'; 
        }
        productsListMain.style.display = 'block';
    } else {
        renderNewHomePage();
        return;
    }

    productsListMain.innerHTML = '';
    let hasVisibleProducts = false;

    for (const categoryKey in allProducts) {
        const products = allProducts[categoryKey];
        const filteredCategoryProducts = products.filter(product => {
            const productName = product.name.toLowerCase();
            const productDescription = product.description ? product.description.toLowerCase() : '';
            return productName.includes(filterText) || productDescription.includes(filterText);
        });

        if (filteredCategoryProducts.length > 0) {
            hasVisibleProducts = true;
            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('product-group-title');
            categoryTitle.textContent = categoryDisplayNames[categoryKey] || categoryKey.replace(/_/g, ' ').toUpperCase();
            productsListMain.appendChild(categoryTitle);

            filteredCategoryProducts.forEach(product => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('product-item');
                itemDiv.setAttribute('data-product-id', product.id);
                itemDiv.onclick = () => handleProductClick(product.id);

                const imgSrc = product.img && product.img !== '' ? product.img : `https://via.placeholder.com/80?text=${encodeURIComponent(product.name.substring(0,8))}`;

                itemDiv.innerHTML = `
                    <img src="${imgSrc}" alt="${product.name}" class="product-item-img" />
                    <div class="product-item-details">
                        <h4>${product.name}</h4>
                        <p>${product.description || ''}</p>
                    </div>
                    <div class="product-item-right">
                        <span class="product-item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <button class="add-to-cart-btn">+</button>
                    </div>
                `;
                productsListMain.appendChild(itemDiv);
            });
        }
    }

    if (!hasVisibleProducts && filterText !== '') {
        productsListMain.innerHTML = `<p style="text-align: center; color: var(--color-text-light); padding: 20px;">Nenhum produto encontrado para "${filterText}".</p>`;
    }
}


// --- INICIALIZAÇÃO QUANDO A PÁGINA CARREGA ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        updateTotal(); 
        updateCartCount();
        validateOrder(false);
        closeCartModal(); // Chama closeCartModal para garantir que a UI inicial está correta

        renderNewHomePage(); // Chama a nova página inicial ao carregar

        // Event Listeners para os modais
        const cartModalOverlay = document.getElementById('cart-modal-overlay');
        if (cartModalOverlay) {
            cartModalOverlay.addEventListener('click', function (event) {
                if (event.target === cartModalOverlay) closeCartModal();
            });
        }
        const complementsModalOverlay = document.getElementById('complements-modal-overlay');
        if (complementsModalOverlay) {
            complementsModalOverlay.addEventListener('click', function (event) {
                if (event.target === complementsModalOverlay) cancelComplementsSelection();
            });
        }

        // LISTENERS PARA REMOVER DESTAQUES E ATUALIZAR
        modalCustomerNameInput?.addEventListener('input', () => { removeHighlightField('modal-customer-name'); updateUI(); });
        modalDeliveryAddressInput?.addEventListener('input', () => { removeHighlightField('modal-delivery-address'); updateUI(); });
        modalTrocoValueInput?.addEventListener('input', () => { removeHighlightField('modal-troco-value'); updateUI(); });
        // Novo listener para email do comprador online
        modalBuyerEmailInput?.addEventListener('input', () => { removeHighlightField('modal-buyer-email'); updateUI(); });
        
        // Listener para os clicks nos cards de pagamento (garante que o rádio é marcado e a função é chamada)
        document.querySelectorAll('#cart-modal-content .payment-card').forEach(card => {
            card.addEventListener('click', function() {
                const radio = this.querySelector('input[name="modal-payment"]');
                if (radio) {
                    // Se o rádio não estiver marcado, marque e dispare o change
                    if (!radio.checked) {
                        radio.checked = true;
                        radio.dispatchEvent(new Event('change'));
                    } else {
                        // Se já estiver marcado, apenas atualiza o visual e valida
                        updatePaymentSelectionVisual();
                        validateOrder(false);
                    }
                }
            });
        });

        // Certifica que o evento 'change' nos rádio buttons também é capturado diretamente
        document.querySelectorAll('input[name="modal-payment"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                selectPaymentMethod(event.target.value);
            });
        });


        document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.bottom-nav .nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

    }, 100);
});

function updateUI() {
    validateOrder(false);
}

function updatePaymentSelectionVisual() {
    document.querySelectorAll('#cart-modal-content .payment-card').forEach(card => {
        const input = card.querySelector('input[name="modal-payment"]');
        if (input?.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}
