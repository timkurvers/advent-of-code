import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
             A
             A
      #######.#########
      #######.........#
      #######.#######.#
      #######.#######.#
      #######.#######.#
      #####  B    ###.#
    BC...##  C    ###.#
      ##.##       ###.#
      ##...DE  F  ###.#
      #####    G  ###.#
      #########.#####.#
    DE..#######...###.#
      #.#########.###.#
    FG..#########.....#
      ###########.#####
                 Z
                 Z
  `, 23),

  example(stripIndent`
                     A
                     A
    #################.#############
    #.#...#...................#.#.#
    #.#.#.###.###.###.#########.#.#
    #.#.#.......#...#.....#.#.#...#
    #.#########.###.#####.#.#.###.#
    #.............#.#.....#.......#
    ###.###########.###.#####.#.#.#
    #.....#        A   C    #.#.#.#
    #######        S   P    #####.#
    #.#...#                 #......VT
    #.#.#.#                 #.#####
    #...#.#               YN....#.#
    #.###.#                 #####.#
  DI....#.#                 #.....#
    #####.#                 #.###.#
  ZZ......#               QG....#..AS
    ###.###                 #######
  JO..#.#.#                 #.....#
    #.#.#.#                 ###.#.#
    #...#..DI             BU....#..LF
    #####.#                 #.#####
  YN......#               VT..#....QG
    #.###.#                 #.###.#
    #.#...#                 #.....#
    ###.###    J L     J    #.#.###
    #.....#    O F     P    #.#...#
    #.###.#####.#.#####.#####.###.#
    #...#.#.#...#.....#.....#.#...#
    #.#####.###.###.#.#.#########.#
    #...#.#.....#...#.#.#.#.....#.#
    #.###.#####.###.###.#.#.#######
    #.#.........#...#.............#
    #########.###.###.#############
             B   J   C
             U   P   P
  `, 58),
];

export const partTwo = [
  example(stripIndent`
               Z L X W       C
               Z P Q B       K
    ###########.#.#.#.#######.###############
    #...#.......#.#.......#.#.......#.#.#...#
    ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###
    #.#...#.#.#...#.#.#...#...#...#.#.......#
    #.###.#######.###.###.#.###.###.#.#######
    #...#.......#.#...#...#.............#...#
    #.#########.#######.#.#######.#######.###
    #...#.#    F       R I       Z    #.#.#.#
    #.###.#    D       E C       H    #.#.#.#
    #.#...#                           #...#.#
    #.###.#                           #.###.#
    #.#....OA                       WB..#.#..ZH
    #.###.#                           #.#.#.#
  CJ......#                           #.....#
    #######                           #######
    #.#....CK                         #......IC
    #.###.#                           #.###.#
    #.....#                           #...#.#
    ###.###                           #.#.#.#
  XF....#.#                         RF..#.#.#
    #####.#                           #######
    #......CJ                       NM..#...#
    ###.#.#                           #.###.#
  RE....#.#                           #......RF
    ###.###        X   X       L      #.#.#.#
    #.....#        F   Q       P      #.#.#.#
    ###.###########.###.#######.#########.###
    #.....#...#.....#.......#...#.....#.#...#
    #####.#.###.#######.#######.###.###.#.#.#
    #.......#.......#.#.#.#.#...#...#...#.#.#
    #####.###.#####.#.#.#.#.###.###.#.###.###
    #.......#.....#.#...#...............#...#
    #############.#.#.###.###################
                 A O F   N
                 A A D   M
  `, 396),
];