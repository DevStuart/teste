# Plano de Melhorias - Riposte: Frontline

## Visão Geral
O jogo Riposte: Frontline é um FPS browser-based com código totalmente procedural. Este plano foca em melhorar o balanceamento, a jogabilidade e a experiência do usuário.

## 1. Balanceamento de Armas (src/06i-armes.js)

### Problemas Identificados:
- M4 e AK-47 têm estatísticas muito similares (dmg: 32-38, range: 18-50/48)
- MP5 e UMP-45 têm cadências muito altas sem compensação de dano
- SVD tem dano menor que L96 mas range maior (comportamento estranho)
- Statísticas não seguem uma curva de progressão clara

### Melhorias:
1. **Implementar curva de dano por distância**: Cada arma deveria ter dano decrescente realista
2. **Ajustar ranges eficazes**: Armas de perto vs longo alcance melhor definidas
3. **Reequilibrar recoil patterns**: Padrões de recuo mais distinguíveis por tipo de arma

### Mudanças propostas:
- M4: manutenção do status de arma referência, mas reduzir recoil vertical
- AK-47: aumentar dano base mas aumentar significativamente recoil vertical
- MP5: manter cadência alta mas reduzir dano em favor de mobilidade
- L96/SVD: ajustar ranges para que SVD tenha vantagem em médio alcance, L96 em longo alcance

## 2. Sistema de Acessórios (src/06p-accessoires.js)

### Problemas Identificados:
- Modificadores de acessórios são multiplicativos simples
- Pouca variedade de efeitos por tipo de acessório
- Acessórios não têm requisitos de nível ou compatibilidade

### Melhorias:
1. **Sistema de compatibilidade**: Alguns acessórios só funcionam com certas famílias
2. **Efeitos proporcionais**: Acessórios dão bônus menores mas mais variados
3. **Trade-offs reais**: Cada acessório tem um custo ou troca de performance

## 3. Classes Personalizadas (src/06r-arsenal.js e src/09n-armurerie.js)

### Problemas Identificados:
- 4 classes pré-definidas sem opção de personalização profunda
- Sistema de séries (killstreaks) desbalanceado
- Desbloqueio de classes baseado apenas em nível

### Melhorias:
1. **Mais slots de classe**: Expandir de 4 para 6 classes personalizadas
2. **Sistema de pontos de equipamento**: Em vez de desbloqueio por nível, usar pontos ganhos em partida
3. **Séries rebalanceadas**: UAV cedo demais, mecha/helicóptero muito poderosos

## 4. Efeitos Visuais e Som

### Melhorias:
1. **Particle effects** melhores nos hits
2. **Sound directionality**: Sons mais direcionais baseados na posição do jogador
3. **Feedback visual** melhor em headshots e kills

## Próximos Passos

1. Executar `python3 build.py` para testar mudanças
2. Rodar testes em `tools/dev/visual/` 
3. Verificar se quebra compatibilidade com maps existentes

## Medidas de Qualidade
- [ ] Todas as armas têm estatísticas consistentes
- [ ] Sistema de acessórios não quebra classes existentes
- [ ] Classes personalizadas são viáveis desde o nível 1
- [ ] Balanceamento testes em modo solo e multiplayer