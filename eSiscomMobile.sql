-- --------------------------------------------------------
-- Servidor:                     mysql.focosistemas.com.br
-- Versão do servidor:           10.6.9-MariaDB-log - MariaDB Server
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando dados para a tabela focosistemas10.clientes: ~8 rows (aproximadamente)
INSERT IGNORE INTO `clientes` (`CODIGO`, `NOME`, `FANTASIA`, `CPF_CNPJ`, `RG_IE`, `RUA`, `BAIRRO`, `CIDADE`, `ESTADO`, `CEP`, `COMPLEMENTO`, `NUMERO`, `OBS`, `EMAIL`, `TELEFONE`, `STATUS`, `VLR_TOTAL_VENDAS`) VALUES
	(1, 'CONSUMIDOR FINAL', 'CONSUMIDOR FINAL', '123.205.404-66', '', 'RUA A', 'CENTRO', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '', 'A', 0.00),
	(2, 'TESTE CNPJ', 'TESTE CNPJ', '12..43.9.6/37/', '', 'A', 'B', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '(82)99612-6492', 'A', 0.00),
	(3, 'TESTE CPF', 'TESTE CPF', '123..20.5.4-04', '', 'RUA', 'BAIRRO', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '(82)99988-9715', 'A', 0.00),
	(4, 'EMPRESA A', 'EMPRESA A', '71.773.711/000', '', 'RUA A', 'BAIRRO A', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '(82)99612-6492', 'A', 0.00),
	(5, 'LUCAS', 'LUCAS', '123.205.324-47', '', 'RUA B', 'BAIRRO B', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '(99)88971-5   ', 'A', 0.00),
	(6, 'MARCOS ANTONIO', 'MARCOS ANTONIO', '123.205.404-66', '', 'CENTRO', 'A', 'ABAIARA', 'CE', '57200-000', '', 0, '', '', '', 'A', 0.00),
	(7, 'THIAGO', 'THIAGO', '   .   .   -  ', '', 'CENTRO', 'CENTRO', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '', 'A', 0.00),
	(8, 'TESTE SENHA', 'TESTE SENHA', '   .   .   -  ', '', 'CENTRO', 'CENTRO', 'PENEDO', 'AL', '57200-000', '', 0, '', '', '', 'A', 0.00);

-- Copiando dados para a tabela focosistemas10.clientes_exportacao: ~0 rows (aproximadamente)

-- Copiando dados para a tabela focosistemas10.condpgto: ~0 rows (aproximadamente)

-- Copiando dados para a tabela focosistemas10.config: ~1 rows (aproximadamente)
INSERT IGNORE INTO `config` (`TAXA_JUROS`, `VERSAO_SERVIDOR`, `GERA_LOG_TXT`, `ALTERA_PRECOS`) VALUES
	(0.22, 0, 'S', 0);

-- Copiando dados para a tabela focosistemas10.forma_pagamento: ~7 rows (aproximadamente)
INSERT IGNORE INTO `forma_pagamento` (`CODIGO`, `NOME`) VALUES
	(1, 'DINHEIRO'),
	(2, 'CHEQUE A VISTA'),
	(3, 'CHEQUE A PRAZO'),
	(4, 'CARTAO DE CREDITO'),
	(5, 'CARTAO DE DEBITO'),
	(6, 'CREDIARIO'),
	(7, 'FINANCEIRA');

-- Copiando dados para a tabela focosistemas10.pedido: ~1 rows (aproximadamente)

-- Copiando dados para a tabela focosistemas10.pedido_item: ~1 rows (aproximadamente)

-- Copiando dados para a tabela focosistemas10.pedido_pagamento: ~1 rows (aproximadamente)
INSERT IGNORE INTO `pedido_pagamento` (`PEDIDO`, `FORMA_PAGAMENTO`, `VALOR`) VALUES
	(1, 1, 30.00);

-- Copiando dados para a tabela focosistemas10.produtos: ~41 rows (aproximadamente)
INSERT IGNORE INTO `produtos` (`CODIGO`, `NOME`, `UNIDADE`, `VLR_VENDA`, `ESTOQUE`, `GRUPO`, `GRUPO_NOME`, `SUBGRUPO`, `SUBGRUPO_NOME`, `MARCA`, `MARCA_NOME`, `FORNECEDOR`, `FORNECEDOR_NOME`) VALUES
	(1, 'COCA COLA', 'UN', 5.00, -134.00, 0, '', 0, '', 0, '', 0, ''),
	(2, 'CARNE', 'UN', 3.00, -59.00, 0, '', 0, '', 0, '', 0, ''),
	(3, 'ARROZ', 'UN', 2.50, -63.00, 0, '', 0, '', 0, '', 0, ''),
	(4, 'FEIJAO', 'UN', 10.00, -5.00, 0, '', 0, '', 0, '', 0, ''),
	(5, 'TESTE', 'UN', 10.00, 13.00, 0, '', 0, '', 0, '', 0, ''),
	(7, 'PLACA MAE', 'UN', 145.00, -1.00, 0, '', 0, '', 0, '', 0, ''),
	(8, 'ROTH BLUE BOX 20/200 RBT', 'UN', 265.15, 0.60, 0, '', 0, '', 0, '', 1, 'SOUZA CRUZ LTDA.'),
	(9, 'ROTH BLUWH 20/200 KRE BE BRA WHITE', 'UN', 230.55, 0.20, 0, '', 0, '', 0, '', 1, 'SOUZA CRUZ LTDA.'),
	(10, 'ROTH RED BOX 20/200 RBT', 'UN', 265.15, 0.80, 0, '', 0, '', 0, '', 1, 'SOUZA CRUZ LTDA.'),
	(11, 'XBOX', 'UN', 2000.00, -1.00, 0, '', 0, '', 0, '', 0, ''),
	(12, 'COMBO HAMBURGAO', 'UN', 20.00, 3.00, 0, '', 0, '', 0, '', 0, ''),
	(13, 'HAMBURGUER', 'UN', 5.00, -7.00, 0, '', 0, '', 0, '', 0, ''),
	(14, 'REFRI', 'UN', 5.00, -8.00, 0, '', 0, '', 0, '', 0, ''),
	(15, 'BATATA FRITA', 'UN', 5.00, -8.00, 0, '', 0, '', 0, '', 0, ''),
	(16, 'TESTE KIT', 'UN', 5.00, 0.00, 0, '', 0, '', 0, '', 0, ''),
	(17, 'MATERIA', 'UN', 5.00, -1.00, 0, '', 0, '', 0, '', 0, ''),
	(18, 'MACACAO CURTO COR AP16A TAM GG', 'PE', 47.65, 0.00, 0, '', 0, '', 0, '', 2, 'MALWEE MALHAS LTDA'),
	(19, 'VESTIDO CURTO COR AP11B TAM XGG', 'PE', 35.70, 0.00, 0, '', 0, '', 0, '', 2, 'MALWEE MALHAS LTDA'),
	(20, 'SABAO PO ASSIM ANTIBAC BAG 24X400G 2339', 'FD', 100.00, 3.00, 0, '', 0, '', 0, '', 3, 'DINAMICA DISTRIBUIDOR LTDA - AL'),
	(21, 'AMENDOIM FRITO PREM KUKY 1536 10X50G', 'PT', 100.00, 1.00, 0, '', 0, '', 0, '', 3, 'DINAMICA DISTRIBUIDOR LTDA - AL'),
	(22, 'CAMISA MASCULINA ', 'UN', 100.00, -2.00, 0, '', 0, '', 0, '', 2, 'MALWEE MALHAS LTDA'),
	(26, 'B.MASC. PRETA BOLSO FACA C/ELAST 36/46 44', 'UN', 22.84, 0.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(27, 'B.MASC.BC COMFORT C/ELAST 36/46 36', 'UN', 23.28, 0.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(28, 'B.MASC.BC COMFORT C/ELAST 36/46 38', 'UN', 23.28, 2.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(29, 'B.MASC.BC COMFORT C/ELAST 36/46 40', 'UN', 23.28, -1.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(30, 'B.MASC.BC COMFORT C/ELAST 36/46 42', 'UN', 23.28, 0.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(31, 'B.MASC.BC COMFORT C/ELAST 36/46 44', 'UN', 23.28, 0.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(32, 'C.MASC. BC AREIA SKINNY C/ELAST 36/46 36', 'UN', 26.80, -1.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(33, 'C.MASC. BC AREIA SKINNY C/ELAST 36/46 38', 'UN', 26.80, 0.00, 0, '', 0, '', 0, '', 4, 'INDIGO RED INDUSTRIA E COMERCIO DE CONFECCOES EIRE'),
	(34, 'ROLAMENTO RODA TRAS LVB445539 LUCAS', 'UN', 78.16, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(35, 'VELA IGNICAO BKR7ESB-D NGK', 'UN', 0.00, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(36, 'AGUA DESMINERALIZADA LM4420 1 LITRO', 'UN', 0.00, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(37, 'CABO VELA VW 5.4 ST-V42 NGK', 'UN', 106.50, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(38, 'ELEMENTO FILTRO AR VW RETANG FAP2217 WEGA', 'UN', 16.26, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(39, 'ELEMENTO FILTRO ACD VW AKX35163/C WEGA', 'UN', 25.08, 0.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(40, 'ELEMENTO FILTRO AR CHEV RETANG FAP3289 WEGA', 'UN', 9.23, 4.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(41, 'KIT DISTRIBUICAO CHEV 1.3 C.DE KS303 GATES', 'KT', 112.00, 1.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(42, 'DEFLETOR OLEO MOTOR VW 087252 AJE', 'UN', 136.34, 1.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(43, 'JUNTA TUCHO CHEV 1 FIAT 598190 ELRING', 'UN', 14.50, 4.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(44, 'ENGRENAGEM VIRABREQUIM CHEV AT052 ANROI', 'UN', 45.97, 1.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA'),
	(45, 'FILTRO OLEO LUBRIF CHEV PLUS WUNI0003 WEGA', 'UN', 10.50, 5.00, 0, '', 0, '', 0, '', 5, 'CYRO CAVALCANTI AUTO PECAS LTDA');

-- Copiando dados para a tabela focosistemas10.titulos: ~2 rows (aproximadamente)
INSERT IGNORE INTO `titulos` (`CODIGO`, `CLIENTE`, `TITULO`, `PARCELA`, `VENCIMENTO`, `VALOR`, `CODVENDA`) VALUES
	(14, 2, 'REST. CDTO', 0, '0000-00-00', 0.00, 0),
	(15, 1, '000149/1', 1, '2022-12-08', 26.80, 149);

-- Copiando dados para a tabela focosistemas10.vendedores: ~3 rows (aproximadamente)
INSERT IGNORE INTO `vendedores` (`CODIGO`, `NOME`, `USUARIO`, `SENHA`) VALUES
	(1, 'LOJA', 'ADMINISTRACAO', '1'),
	(2, 'MARCOS', 'MARCOS', '10'),
	(3, 'PEDRO', 'PEDRO', '1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
