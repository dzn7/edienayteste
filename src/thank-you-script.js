// ATENÇÃO: SUBSTITUA TODO O CONTEÚDO DO SEU ARQUIVO thank-you-script.js POR ESTE

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um tempo para o usuário ver a mensagem antes de redirecionar
    // Este timeout agora é para dar tempo de salvar no Bin e exibir alerta se falhar
    setTimeout(() => {
        processOrderAndSendWhatsApp(); // Chamamos uma nova função principal
    }, 1000); // 1 segundo de espera antes de tentar processar
});

async function processOrderAndSendWhatsApp() {
    const fullOrderDetailsString = localStorage.getItem('fullOrderDetails');
    if (!fullOrderDetailsString) {
        alert("Ops! Não encontramos os detalhes do seu pedido para enviar.");
        window.location.href = '/'; // Redireciona de volta para a página inicial
        return;
    }

    try {
        const orderDetails = JSON.parse(fullOrderDetailsString);
        
        // ==========================================================
        //  INÍCIO DO CÓDIGO JSON BIN AQUI (NOVO LOCAL)
        // ==========================================================
        const JSON_BIN_ID = '68674bfc8a456b7966bb0692'; // <--- SUBSTITUA PELO SEU BIN ID
        const JSON_BIN_MASTER_KEY = '$2a$10$QwEHfmGP0RkaIffnX8NDfO62ZrB.EnqZ.fE04T1FqMF2dRS9w9bSG'; // <--- SUBSTITUA PELA SUA CHAVE MESTRA (CUIDADO!)
        const JSON_BIN_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

        try {
            // Primeiro, vamos tentar ler o conteúdo atual do Bin
            const readResponse = await fetch(JSON_BIN_URL + '/latest', { // '/latest' para pegar a última versão
                method: 'GET',
                headers: {
                    'X-Master-Key': JSON_BIN_MASTER_KEY,
                    'X-Bin-Meta': 'false' // Retorna apenas o conteúdo do JSON
                }
            });

            let existingData = [];
            if (readResponse.ok) {
                const data = await readResponse.json();
                // Verifica se os dados existentes são um array, caso contrário, inicializa como vazio
                existingData = Array.isArray(data) ? data : [];
            } else if (readResponse.status === 404) {
                 // Bin pode estar vazio ou ser a primeira escrita
                 console.log("JSON Bin vazio ou não encontrado, criando novo.");
                 existingData = [];
            } else {
                console.error("Erro ao ler JSON Bin:", readResponse.status, readResponse.statusText);
                // Mesmo com erro de leitura, tentamos prosseguir adicionando apenas o novo pedido
                alert("Ocorreu um erro ao ler dados anteriores do Bin. Tentando enviar o novo pedido mesmo assim.");
                existingData = []; 
            }

            // Adiciona o novo pedido ao array de dados existentes
            const dataToSend = [...existingData, { ...orderDetails, sentAt: new Date().toISOString() }];

            // Agora, escrevemos o array atualizado de volta no Bin
            const writeResponse = await fetch(JSON_BIN_URL, {
                method: 'PUT', // PUT sobrescreve o conteúdo existente
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSON_BIN_MASTER_KEY,
                    'X-Bin-Name': 'pedidos_acai_data' // Opcional: um nome para o seu Bin
                },
                body: JSON.stringify(dataToSend)
            });

            if (writeResponse.ok) {
                console.log('Pedido salvo com sucesso no JSON Bin!');
            } else {
                console.error("Erro ao salvar pedido no JSON Bin:", writeResponse.status, writeResponse.statusText);
                alert("Erro ao salvar pedido no banco de dados. O pedido será enviado via WhatsApp.");
            }

        } catch (jsonBinError) {
            console.error("Erro na comunicação com JSON Bin (no catch):", jsonBinError);
            alert("Ocorreu um erro ao tentar salvar o pedido online. O pedido será enviado via WhatsApp.");
        }
        // ==========================================================
        //  FIM DO CÓDIGO JSON BIN AQUI
        // ==========================================================


        // --- INÍCIO DA LÓGICA DE MONTAGEM DA MENSAGEM DO WHATSAPP ---
        const whatsappNumber = "558699127297"; // CONFIRA SE ESTE É O SEU NÚMERO

        let whatsappMessage = `Olá! 👋 *Pedido de:*\n${orderDetails.customerName}\n\n*Meu pedido: 🛍️*`;

        if (orderDetails.items && orderDetails.items.length > 0) {
            orderDetails.items.forEach((item, index) => {
                const basePriceFormatted = `R$ ${item.basePrice.toFixed(2).replace('.', ',')}`;
                whatsappMessage += `\n\n*🍧Açaí ${index + 1}:* ${item.name} - ${basePriceFormatted}`;

                const groupedComplements = {};
                item.complements.forEach(comp => {
                    if (!comp) return; // Garante que o complemento existe
                    if (!groupedComplements[comp.category]) {
                        groupedComplements[comp.category] = [];
                    }
                    let complementText = comp.name;
                    if (comp.price > 0) {
                        complementText += ` (+R$ ${comp.price.toFixed(2).replace('.', ',')})`;
                    }
                    groupedComplements[comp.category].push(complementText);
                });

                const categoryOrder = {
                    'gratis': 'Complementos Grátis',
                    'cobertura': 'Coberturas',
                    'creme': 'Cremes',
                    'adicional': 'Adicionais Pagos'
                };

                for (const categoryKey in categoryOrder) {
                    if (groupedComplements[categoryKey] && groupedComplements[categoryKey].length > 0) {
                        whatsappMessage += `\n  *${categoryOrder[categoryKey]}:*`;
                        groupedComplements[categoryKey].forEach(compName => {
                            whatsappMessage += `\n    - ${compName}`;
                        });
                    }
                }
            });
        }
        
        whatsappMessage += `\n\n----------------------------------`;

        if (orderDetails.deliveryOption.type === 'Entrega') {
            whatsappMessage += `\n*🛵Taxa de Entrega: * R$ 2,00`;
            whatsappMessage += `\n*📍Endereço de Entrega: * ${orderDetails.deliveryOption.address}`;
        } else {
            whatsappMessage += `\n*🏠Opção:* Retirada no local`;
        }

        whatsappMessage += `\n*💰Forma de Pagamento: * ${orderDetails.paymentMethod}`;
        if (orderDetails.trocoPara && orderDetails.trocoPara > 0) {
            whatsappMessage += `\n  - *Levar troco para:* R$ ${orderDetails.trocoPara.toFixed(2).replace('.', ',')}`;
        }
        
        whatsappMessage += `\n----------------------------------`;
        whatsappMessage += `\n*🧾Total do Pedido:* R$ ${orderDetails.total.toFixed(2).replace('.', ',')}`;

        // --- FIM DA LÓGICA DE MONTAGEM DA MENSAGEM ---

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Limpa o localStorage para não reenviar o mesmo pedido em um novo acesso
        localStorage.removeItem('cart');
        localStorage.removeItem('fullOrderDetails');

        // Redireciona o usuário para o WhatsApp
        window.location.href = whatsappLink;

    } catch (error) {
        console.error("Erro ao processar pedido ou gerar mensagem para WhatsApp:", error);
        alert("Ocorreu um erro ao preparar seu pedido. Por favor, tente novamente.");
    }
}