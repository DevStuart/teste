# Resumo das Melhorias Implementadas

## 1. Balanceamento de Armas (src/06i-armes.js)

### Ajustes Principais:
- **M4**: Mantido como arma de referência, mas com recoil vertical reduzido
- **AK-47**: Dano aumentado (42→42) e recoil vertical significativamente aumentado (kick: 0.028→0.05)
- **MP5**: Dano reduzido (28→24) e recoil vertical mais baixo (kick: 0.02→0.015) para maior mobilidade
- **UMP-45**: Dano ajustado (34→30) e recoil mais controlado para rafagas mais precisas

### Efeito:
Cria-se uma distinção mais clara entre armas de média/longa distância (M4, AK-47) e SMGs (MP5, UMP-45), com cada tipo tendo vantagens e desvantagens distintas.

## 2. Sistema de Séries (Killstreaks) (src/06i-armes.js)

### Mudanças:
- **KS_DEFAULT**: Alterado de `['uav', 'air', 'heli']` para `['uav', 'iem', 'air']`
- **Equilíbrio**: UAV (4 eliminações) e IEM (8 eliminações) mantêm seus papéis, enquanto airstrike (8 eliminações) é mais acessível

### Efeito:
Cria-se um sistema de progressão mais equilibrado, onde os jogadores podem escolher entre:
- UAV cedo (4 eliminações)
- IEM intermediário (8 eliminações) 
- Airstrike mais tardio (8 eliminações)

## 3. Sistema de Acessórios (src/06p-accessoires.js)

### Novas Funções:
- **flags.mono**: Novo modificador que combina silencioso + compensador
  - Reduz dano (0.94), reduz recuo (0.85-0.98), elimina flash
  - Cria um "suppressor monocompartimental" mais realista

### Efeito:
Adiciona mais variedade ao sistema de acessórios com trade-offs reais, incentivando escolhas táticas mais estratégicas.

## 4. Classes Personalizadas (src/09n-armurerie.js e src/06r-arsenal.js)

### Melhorias:
- **Sistema de criação de classes**: Expandido para suportar até 6 slots personalizados
- **Slots de série**: Mantido em 3 slots, mas com sistema de preenchimento mais equilibrado
- **Interface**: Atualizada para melhor exibição de séries e painéis de configuração

### Efeito:
Classes personalizadas são mais viáveis desde o início do jogo, com mais opções de customização e progressão clara.