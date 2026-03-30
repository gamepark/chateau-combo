import { css } from '@emotion/react'
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import FacialHairColorName from '@gamepark/avataaars/dist/avatar/top/facialHair/FacialHairColorName'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { Card } from '@gamepark/chateau-combo/material/Card'
import { Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { goldCoinDescription } from '../material/GoldCoinDescription'
import { shieldImages } from '../material/help/Images'
import { keyDescription } from '../material/KeyDescription'
import { me, opponent, TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 2
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, {
    id: opponent,
    name: 'Michel',
    avatar: {
      topType: TopType.ShortHairShaggyMullet,
      hairColor: HairColorName.SilverGray,
      facialHairType: FacialHairType.MoustacheFancy,
      facialHairColor: FacialHairColorName.BrownDark,
      clotheType: ClotheType.CollarSweater,
      clotheColor: ClotheColorName.PastelRed,
      eyeType: EyeType.Squint,
      eyebrowType: EyebrowType.FlatNatural,
      mouthType: MouthType.Smile,
      skinColor: SkinColor.Light
    }
  }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.welcome"/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.recruit"/>
        ),
        position: {
          x: 50
        },
        size: {
          width: 80
        }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.River)
        ],
        margin: {
          top: 3,
          bottom: 1,
          right: 17
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.tableau"/>
        ),
        position: {
          x: 45
        },
        size: {
          width: 80
        }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.River)
        ],
        margin: {
          top: 3,
          bottom: 1,
          right: 17
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.cost"/>
        ),
        position: {
          x: 45
        },
        size: {
          width: 80
        }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.River)
        ],
        locations: this.material(game, MaterialType.Card).location(LocationType.River).getIndexes().map((index) => this.location(LocationType.GoldIcon).parent(index).location),
        margin: {
          top: 3,
          bottom: 1,
          right: 17
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.cost.your"/>
        ),
        position: {
          x: 50
        },
        size: {
          width: 80
        }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(me)
        ],
        margin: {
          top: 3,
          bottom: 1,
          right: 17
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.recruit.stonemason"/>
        ),
        position: { x: 10, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Stonemason)
        ],
        locations: [
          this.location(LocationType.Tableau).player(me).x(0).y(0).location
        ],
        margin: {
          top: 1,
          left: 2,
          right: 10,
          bottom: 2
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && !move.location.rotation && move.itemIndex === this.material(game, MaterialType.Card).id((id: {
          front: Card
        }) => id.front === Card.Stonemason).getIndex(),
        interrupt: (move) => isDeleteItemType(MaterialType.GoldCoin)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.cost.auto"/>
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Stonemason),
          this.material(game, MaterialType.GoldCoin).player(me),
          this.material(game, MaterialType.GoldCoin).player(me).location(LocationType.GoldStock)
        ],
        staticItems: goldCoinDescription.staticItems.map((item) => ({ type: MaterialType.GoldCoin, item })),
        margin: {
          left: 1,
          top: 1,
          right: 1,
          bottom: 1
        }
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.MessengerPawn)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.discount"
            components={{
              bold: <strong/>
            }}
          />
        ),
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Stonemason)
        ],
        locations: [
          this.location(LocationType.Effect).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Stonemason).getIndex()).location
        ],
        margin: {
          top: 3,
          right: 15
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.village"
            components={{
              bold: <strong/>,
              shield1: <Picture css={mini} src={shieldImages[Shield.Military]}/>,
              shield2: <Picture css={mini} src={shieldImages[Shield.Craftsmanship]}/>,
              shield3: <Picture css={mini} src={shieldImages[Shield.Peasantry]}/>
            }}
          />
        ),
        position: {
          y: 25
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.River).locationId(Place.Village)
        ],
        margin: {
          bottom: 8
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.castle"
                 components={{
                   bold: <strong/>,
                   shield1: <Picture css={mini} src={shieldImages[Shield.Nobility]}/>,
                   shield2: <Picture css={mini} src={shieldImages[Shield.Faith]}/>,
                   shield3: <Picture css={mini} src={shieldImages[Shield.Scholarship]}/>
                 }}
          />
        ),
        position: {
          y: 25
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.River).locationId(Place.Castle)
        ],
        margin: {
          bottom: 8
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.messenger"/>
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.MessengerPawn)
        ],
        margin: {
          bottom: 9
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.messenger.stonemason"/>
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Stonemason),
          this.material(game, MaterialType.MessengerPawn)
        ],
        locations: [
          this.location(LocationType.MessengerIcon).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Stonemason).getIndex()).location
        ],
        margin: {
          left: 2,
          right: 2,
          top: 5
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.opponent"/>
        )
      }
    },
    {
      view: opponent,
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && !move.location.rotation
          && this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Duchess).getIndex() === move.itemIndex
      }
    },
    {
      view: opponent,
      popup: {
        text: () => (
          <Trans i18nKey="tuto.opponent.duchess"/>
        )
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Key).player(opponent),
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Duchess)
        ],
        margin: {
          bottom: 2
        }
      })
    },
    {
      view: me,
      popup: {
        text: () => (
          <Trans i18nKey="tuto.you"/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.shields.points"
            components={{
              shield: <Picture css={mini} src={shieldImages[Shield.Craftsmanship]}/>
            }}
          />
        ),
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Stonemason)
        ],
        locations: [
          this.location(LocationType.ScoringArea).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Stonemason).getIndex()).location,
          this.location(LocationType.Shields).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Stonemason).getIndex()).location
        ],
        margin: {
          right: 15
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.potter"
                 components={{
                   shield: <Picture css={mini} src={shieldImages[Shield.Craftsmanship]}/>
                 }}
          />
        ),
        position: { y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Potter)
        ],
        margin: {
          bottom: 6
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.spend.key"
                 components={{
                   bold: <strong/>
                 }}/>
        ),
        position: { x: 20, y: -10 },
        size: { width: 100 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Key).location(LocationType.PlayerKeyStock).player(me)
        ],
        staticItems: keyDescription.staticItems.map((i) => ({ type: MaterialType.Key, item: i })),
        margin: {
          top: 5,
          left: 2,
          right: 2
        }
      }),
      move: {
        filter: (move) => isDeleteItemType(MaterialType.Key)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.move.messenger"/>
        ),
        position: { x: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.MessengerPawn)
        ],
        margin: {
          bottom: 10,
          top: 4,
          right: 15
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.MessengerPawn)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.recruit.potter"
            components={{
              italic: <em/>
            }}
          />
        ),
        position: { y: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Potter)
        ],
        locations: [
          this.location(LocationType.Tableau).player(me).x(-1).y(0).location,
          this.location(LocationType.Tableau).player(me).x(1).y(0).location,
          this.location(LocationType.Tableau).player(me).x(0).y(-1).location,
          this.location(LocationType.Tableau).player(me).x(0).y(1).location
        ],
        margin: {
          top: 5,
          right: 5,
          left: 1,
          bottom: 1
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && !move.location.rotation && this.material(game, MaterialType.Card).id((id: {
          front: Card
        }) => id.front === Card.Potter).getIndex() === move.itemIndex,
        interrupt: (move) => isCreateItemType(MaterialType.GoldCoin)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.potter.bag"/>
        ),
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Potter)
        ],
        locations: [
          this.location(LocationType.ScoringArea).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Potter).getIndex()).location
        ],
        margin: {
          right: 15
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.potter.effect"/>
        ),
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id((id: { front: Card }) => id.front === Card.Potter)
        ],
        locations: [
          this.location(LocationType.Effect).parent(this.material(game, MaterialType.Card).id((id: {
            front: Card
          }) => id.front === Card.Potter).getIndex()).location
        ],
        margin: {
          right: 15
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.end.gold"/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.hidden.card"
            components={{
              bold: <strong/>
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.card.click"
            components={{
              bold: <strong/>
            }}
          />
        )
      }
    }
  ]
}

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`