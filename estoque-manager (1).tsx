import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Download } from 'lucide-react';

const EstoqueManager = () => {
  const [estoque, setEstoque] = useState({
    'PREGO 17X27': {quantidade: 10, valorUnitario: 15.80, unidade: 'KG'},
    'PREGO 18X36': {quantidade: 5, valorUnitario: 15.80, unidade: 'KG'},
    'TABUA 1X4X2.50M PINUS': {quantidade: 90, valorUnitario: 5.80, unidade: 'UN'},
    'VIGA 2X4X2.50M PINUS': {quantidade: 24, valorUnitario: 11.60, unidade: 'UN'},
    'DOBRADICA PORTAO 90X45X1.9MM': {quantidade: 6, valorUnitario: 19.90, unidade: 'UN'},
    'PARAFUSO PONTA BROCA 5.5MMX1.1/2': {quantidade: 350, valorUnitario: 35.00, unidade: 'CENT'},
    'JOELHO 90 ESGOTO 100MM': {quantidade: 8, valorUnitario: 6.16, unidade: 'UN'},
    'TUBO PVC ESGOTO 6M 100MM': {quantidade: 2, valorUnitario: 82.50, unidade: 'UN'},
    'JOELHO 90 ESGOTO 150MM': {quantidade: 2, valorUnitario: 43.62, unidade: 'UN'},
    'TE ESGOTO 150X100MM': {quantidade: 6, valorUnitario: 61.82, unidade: 'UN'},
    'TUBO PVC ESGOTO 6M 150MM': {quantidade: 9, valorUnitario: 205.00, unidade: 'UN'},
    'ADESIVO PVC FRASCO 850GR': {quantidade: 1, valorUnitario: 65.10, unidade: 'UN'}
  });
  
  const [historico, setHistorico] = useState([
    {
      data: '20/11/2024',
      tipo: 'entrada',
      material: 'TE ESGOTO 150X100MM',
      quantidade: 2,
      observacao: 'Retorno de material não utilizado'
    },
    {
      data: '20/11/2024',
      tipo: 'entrada',
      material: 'TE ESGOTO 150X100MM',
      quantidade: 2,
      observacao: 'Retorno de material não utilizado'
    },
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'PREGO 17X27',
      quantidade: 10,
      valorUnitario: 15.80,
      notaFiscal: '000.123.501'
    }, 
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'PREGO 18X36',
      quantidade: 5,
      valorUnitario: 15.80,
      notaFiscal: '000.123.501'
    }, 
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'TABUA 1X4X2.50M PINUS',
      quantidade: 110,
      valorUnitario: 5.80,
      notaFiscal: '000.123.501'
    }, 
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'VIGA 2X4X2.50M PINUS',
      quantidade: 44,
      valorUnitario: 11.60,
      notaFiscal: '000.123.501'
    }, 
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'DOBRADICA PORTAO 90X45X1.9MM',
      quantidade: 6,
      valorUnitario: 19.90,
      notaFiscal: '000.123.501'
    }, 
    {
      data: '04/11/2024',
      tipo: 'entrada',
      material: 'PARAFUSO PONTA BROCA 5.5MMX1.1/2',
      quantidade: 700,
      valorUnitario: 35.00,
      notaFiscal: '000.123.501'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'JOELHO 90 ESGOTO 100MM',
      quantidade: 6,
      valorUnitario: 6.16,
      notaFiscal: '000.123.037'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'TUBO PVC ESGOTO 6M 100MM',
      quantidade: 2,
      valorUnitario: 82.50,
      notaFiscal: '000.123.037'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'JOELHO 90 ESGOTO 150MM',
      quantidade: 2,
      valorUnitario: 43.62,
      notaFiscal: '000.123.037'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'TE ESGOTO 150X100MM',
      quantidade: 8,
      valorUnitario: 61.82,
      notaFiscal: '000.123.037'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'TUBO PVC ESGOTO 6M 150MM',
      quantidade: 9,
      valorUnitario: 205.00,
      notaFiscal: '000.123.037'
    },
    {
      data: '15/10/2024',
      tipo: 'entrada',
      material: 'ADESIVO PVC FRASCO 850GR',
      quantidade: 1,
      valorUnitario: 65.10,
      notaFiscal: '000.123.037'
    },
    {
      data: '19/11/2024',
      tipo: 'saída',
      material: 'TABUA 1X4X2.50M PINUS',
      quantidade: 20,
      servico: 'Tapume',
      medicao: '40 m²'
    },
    {
      data: '19/11/2024',
      tipo: 'saída',
      material: 'VIGA 2X4X2.50M PINUS',
      quantidade: 20,
      servico: 'Tapume',
      medicao: '40 m²'
    },
    {
      data: '19/11/2024',
      tipo: 'saída',
      material: 'PARAFUSO PONTA BROCA 5.5MMX1.1/2',
      quantidade: 350,
      servico: 'Tapume',
      medicao: '40 m²'
    }
  ]);

  const [busca, setBusca] = useState('');

  const calcularValorTotal = (material) => {
    const item = estoque[material];
    if (item.unidade === 'CENT') {
      return (item.quantidade / 100) * item.valorUnitario;
    }
    return item.quantidade * item.valorUnitario;
  };

  const calcularConsumoTotal = (material) => {
    return historico
      .filter(mov => mov.material === material && mov.tipo === 'saída')
      .reduce((total, mov) => total + mov.quantidade, 0);
  };

  const calcularComprasTotal = (material) => {
    return historico
      .filter(mov => mov.material === material && mov.tipo === 'entrada')
      .reduce((total, mov) => total + mov.quantidade, 0);
  };

  const calcularConsumoPorServico = (material) => {
    return historico
      .filter(mov => mov.material === material && mov.tipo === 'saída' && mov.servico)
      .reduce((acc, mov) => {
        if (!acc[mov.servico]) {
          acc[mov.servico] = 0;
        }
        acc[mov.servico] += mov.quantidade;
        return acc;
      }, {});
  };

  const exportarDados = () => {
    // Prepara os dados do estoque atual
    const dadosEstoque = Object.entries(estoque).map(([material, dados]) => ({
      material,
      quantidade_atual: dados.quantidade,
      unidade: dados.unidade,
      valor_unitario: dados.valorUnitario,
      valor_total: calcularValorTotal(material),
      consumo_total: calcularConsumoTotal(material),
      compras_total: calcularComprasTotal(material),
      data_extracao: new Date().toLocaleDateString('pt-BR')
    }));

    // Prepara os dados do histórico
    const dadosHistorico = historico.map(mov => ({
      data: mov.data,
      tipo: mov.tipo,
      material: mov.material,
      quantidade: mov.quantidade,
      valor_unitario: mov.valorUnitario || '',
      nota_fiscal: mov.notaFiscal || '',
      servico: mov.servico || '',
      medicao: mov.medicao || '',
      valor_total: mov.valorUnitario ? (mov.quantidade * mov.valorUnitario) : ''
    }));

    // Prepara os dados de consumo por serviço
    const dadosConsumoServico = Object.entries(estoque).flatMap(([material, dados]) => {
      const consumoPorServico = calcularConsumoPorServico(material);
      return Object.entries(consumoPorServico).map(([servico, quantidade]) => ({
        material,
        servico,
        quantidade_consumida: quantidade,
        unidade: dados.unidade
      }));
    });

    // Cria os CSVs
    const estoqueCSV = [
      ['Material', 'Quantidade Atual', 'Unidade', 'Valor Unitário', 'Valor Total', 'Consumo Total', 'Compras Total', 'Data Extração'],
      ...dadosEstoque.map(item => [
        item.material,
        item.quantidade_atual,
        item.unidade,
        item.valor_unitario,
        item.valor_total,
        item.consumo_total,
        item.compras_total,
        item.data_extracao
      ])
    ].map(row => row.join(';')).join('\\n');

    const historicoCSV = [
      ['Data', 'Tipo', 'Material', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Nota Fiscal', 'Serviço', 'Medição'],
      ...dadosHistorico.map(item => [
        item.data,
        item.tipo,
        item.material,
        item.quantidade,
        item.valor_unitario,
        item.valor_total,
        item.nota_fiscal,
        item.servico,
        item.medicao
      ])
    ].map(row => row.join(';')).join('\\n');

    const consumoServicoCSV = [
      ['Material', 'Serviço', 'Quantidade Consumida', 'Unidade'],
      ...dadosConsumoServico.map(item => [
        item.material,
        item.servico,
        item.quantidade_consumida,
        item.unidade
      ])
    ].map(row => row.join(';')).join('\\n');

    // Cria os blobs e faz o download
    const downloadCSV = (content, filename) => {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    };

    // Download dos três arquivos
    downloadCSV(estoqueCSV, 'estoque_atual.csv');
    setTimeout(() => downloadCSV(historicoCSV, 'historico_movimentacoes.csv'), 100);
    setTimeout(() => downloadCSV(consumoServicoCSV, 'consumo_por_servico.csv'), 200);
  };

  const materiaisFiltrados = Object.entries(estoque).filter(([material]) => 
    material.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
        <div className="flex items-center bg-white p-2 rounded-lg shadow flex-1">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar material..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full p-2 outline-none"
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Valor total em estoque</div>
          <div className="text-lg font-bold">
            R$ {Object.entries(estoque).reduce((total, [material, dados]) => 
              total + calcularValorTotal(material), 0).toFixed(2)}
          </div>
        </div>
        <button 
          onClick={exportarDados}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-5 h-5" />
          Exportar Dados
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estoque Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {materiaisFiltrados.map(([material, dados]) => {
              const consumoTotal = calcularConsumoTotal(material);
              const comprasTotal = calcularComprasTotal(material);
              const consumoPorServico = calcularConsumoPorServico(material);
              
              return (
                <div key={material} className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>{material}</span>
                    <span>{dados.quantidade} {dados.unidade} em estoque</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Total comprado: {comprasTotal} {dados.unidade}</div>
                      <div>Total consumido: {consumoTotal} {dados.unidade}</div>
                      <div>
                        {dados.unidade === 'CENT' ? (
                          <>Valor unitário: R$ {dados.valorUnitario.toFixed(2)} / centena</>
                        ) : (
                          <>Valor unitário: R$ {dados.valorUnitario.toFixed(2)} / {dados.unidade}</>
                        )}
                      </div>
                      <div>Valor em estoque: R$ {calcularValorTotal(material).toFixed(2)}</div>
                    </div>
                    {Object.entries(consumoPorServico).length > 0 && (
                      <div className="mt-2">
                        <div className="font-medium">Consumo por serviço:</div>
                        {Object.entries(consumoPorServico).map(([servico, quantidade]) => (
                          <div key={servico} className="pl-2">
                            - {servico}: {quantidade} {dados.unidade}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {historico
              .filter(mov => mov.material.toLowerCase().includes(busca.toLowerCase()))
              .sort((a, b) => new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-')))
              .map((movimento, index) => (
                <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <span>{movimento.data}</span>
                    {movimento.notaFiscal && (
                      <span className="text-sm text-gray-500 ml-2">
                        (NF {movimento.notaFiscal})
                      </span>
                    )}
                  </div>
                  <div className="flex-2">
                    <span>{movimento.material}</span>
                    {movimento.servico && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({movimento.servico} - {movimento.medicao})
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <span className={movimento.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                      {movimento.tipo === 'entrada' ? '+' : '-'}{movimento.quantidade}
                    </span>
                    {movimento.valorUnitario && (
                      <span className="text-sm text-gray-500 ml-2">
                        R$ {movimento.valorUnitario.toFixed(2)}/un
                      </span>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoqueManager;
