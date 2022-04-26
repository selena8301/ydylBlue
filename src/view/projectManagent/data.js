export default [
    {
      id: "1",
      label: "沿线国家安全",
      children: [
        {
          id: "1-1",
          label: "反华",
          parentId: "1",
        },
        {
          id: "1-2",
          label: "宗教冲突",
          parentId: "1",
        },
        {
          id: "1-3",
          label: "政权",
          parentId: "1",
        },
        {
          id: "1-4",
          label: "恐怖袭击",
          parentId: "1",
        },
        {
          id: "1-5",
          label: "邻国冲突",
          parentId: "1",
        },
      ]
    },
    {
      id: "2",
      label: "安全态势感知",
      children: [
        {
          id: "2-1",
          label: "整体安全态势感知",
          parentId: "2",
          children: [
            {
              id: "2-1-1",
              label: "恐怖袭击",
              parentId: "2-1",
            },
            {
              id: "2-1-2",
              label: "分类安全数据趋势",
              parentId: "2-1",
            },
          ]
        },
        {
          id: "2-2",
          label: "政治安全态势感知",
          parentId: "2",
          children: [
            {
              id: "2-2-1",
              label: "政权、政党争斗",
              parentId: "2-2",
              children: [
                {
                  id: "2-2-1-1",
                  label: "舆论偏向",
                  parentId: "2-2-1",
                }
              ]
            },
            {
              id: "2-2-2",
              label: "政权更迭",
              parentId: "2-2",
              children: [
                {
                  id: "2-2-2-1",
                  label: "演讲",
                  parentId: "2-2-2",
                  children: [
                    {
                      id: "2-2-2-1-1",
                      label: "是否反对“一带一路”",
                      parentId: "2-2-2-1",
                    }
                  ]
                },
                {
                  id: "2-2-2-2",
                  label: "民意投票",
                  parentId: "2-2-2",
                  children: [
                    {
                      id: "2-2-2-2-1",
                      label: "支持率",
                      parentId: "2-2-2-2",
                    }
                  ]
                },
                {
                  id: "2-2-2-3",
                  label: "选举",
                  parentId: "2-2-2",
                  children: [
                    {
                      id: "2-2-2-3-1",
                      parentId: "2-2-2-3",
                      label: "结果",
                    }
                  ]
                },
              ]
            },
            {
              id: "2-2-3",
              label: "决策动向",
              parentId: "2-2",
              children: [
                {
                  id: "2-2-3-1",
                  label: "宪法修改",
                  parentId: "2-2-3",
                  children: [
                    {
                      id: "2-2-3-1-1",
                      label: "正负面意义",
                      parentId: "2-2-3-1",
                    }
                  ]
                },
                {
                  id: "2-2-3-2",
                  label: "政策颁布",
                  parentId: "2-2-3",
                  children: [
                    {
                      id: "2-2-3-2-1",
                      label: "产生影响",
                      parentId: "2-2-3-2",
                    }
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "2-3",
          label: "社会安全态势感知",
          parentId: "2",
          children: [
            {
              id: "2-3-1",
              label: "恐怖袭击",
              parentId: "2-3",
            },
            {
              id: "2-3-2",
              label: "民族分裂",
              parentId: "2-3",
              children: [
                {
                  id: "2-3-2-1",
                  label: "分裂主义武装",
                  parentId: "2-3-2",
                }
              ]
            },
            {
              id: "2-3-3",
              label: "宗教冲突",
              parentId: "2-3",
            },
          ]
        },
        {
          id: "2-4",
          label: "国土安全态势感知",
          parentId: "2",
          children: [
            {
              id: "2-4-1",
              label: "邻国冲突",
              parentId: "2-4",
              children: [
                {
                  id: "2-4-1-1",
                  label: "境外恐怖组织渗透",
                  parentId: "2-4-1",
                },
                {
                  id: "2-4-1-2",
                  label: "国土入侵",
                  parentId: "2-4-1",
                  children: [
                    {
                      id: "2-4-1-2-1",
                      label: "领土",
                      parentId: "2-4-1-2",
                    },
                    {
                      id: "2-4-1-2-2",
                      label: "领海",
                      parentId: "2-4-1-2",
                    },
                    {
                      id: "2-4-1-2-3",
                      label: "领空",
                      parentId: "2-4-1-2",
                    },
                  ]
                },
              ]
            },
            {
              id: "2-4-2",
              label: "自然灾害",
              parentId: "2-4",
              children: [
                {
                  id: "2-4-2-1",
                  label: "地震",
                  parentId: "2-4-2",
                  children: [
                    {
                      id: "2-4-2-1-1",
                      label: "等级",
                      parentId: "2-4-2-1",
                    },
                    {
                      id: "2-4-2-1-2",
                      label: "伤亡人数",
                      parentId: "2-4-2-1",
                    },
                  ]
                },
                {
                  id: "2-4-2-2",
                  label: "海啸",
                  parentId: "2-4-2",
                },
              ]
            },
          ]
        },
        {
          id: "2-5",
          label: "生物安全态势感知",
          parentId: "2",
          children: [
            {
              id: "2-5-1",
              label: "流行疾病",
              parentId: "2-5",
              children: [
                {
                  id: "2-5-1-1",
                  label: "类型",
                  parentId: "2-5-1",
                },
                {
                  id: "2-5-1-2",
                  label: "感染数量",
                  parentId: "2-5-1",
                },
              ]
            }
          ]
        },
      ]
    },
    {
      id: "3",
      label: "大国博弈",
      children: [
        {
          id: "3-1",
          label: "中美博弈",
          parentId: "3",
          children: [
            {
              id: "3-1-1",
              label: "政治",
              parentId: "3-1",
              children: [
                {
                  id: "3-1-1-1",
                  label: "政权更迭",
                  parentId: "3-1-1",
                }, {
                  id: "3-1-1-2",
                  label: "选举",
                  parentId: "3-1-1",
                }
              ],
            },
            {
              id: "3-1-2",
              label: "经济",
              parentId: "3-1",
              children: [
                {
                  id: "3-1-2-1",
                  label: "贸易战",
                  parentId: "3-1-2",
                }
              ],
            },
            {
              id: "3-1-3",
              label: "军事",
              parentId: "3-1",
              children: [
                {
                  id: "3-1-3-1",
                  label: "南海问题",
                  parentId: "3-1-3",
                }, {
                  id: "3-1-3-2",
                  label: "台湾问题",
                  parentId: "3-1-3",
                }
              ],
            },
            {
              id: "3-1-4",
              label: "文化",
              parentId: "3-1",
            },
            {
              id: "3-1-5",
              label: "意识形态",
              parentId: "3-1",
            },
          ],
        },
        {
          id: "3-2",
          label: "中俄博弈",
          parentId: "3",
          children: [
            {
              id: "3-2-1",
              label: "政治",
              parentId: "3-2",
              children: [
                {
                  id: "3-2-1-1",
                  label: "政权更迭",
                  parentId: "3-2-1",
                }, {
                  id: "3-2-1-2",
                  label: "选举",
                  parentId: "3-2-1",
                }
              ],
            },
            {
              id: "3-2-2",
              label: "经济",
              parentId: "3-2",
              children: [
                {
                  id: "3-2-2-1",
                  label: "贸易战",
                  parentId: "3-2-2",
                }
              ],
            },
            {
              id: "3-2-3",
              label: "军事",
              parentId: "3-2",
              children: [
                {
                  id: "3-2-3-1",
                  label: "南海问题",
                  parentId: "3-2-3",
                }, {
                  id: "3-2-3-2",
                  label: "台湾问题",
                  parentId: "3-2-3",
                }
              ],
            },
            {
              id: "3-2-4",
              label: "文化",
              parentId: "3-2",
            },
            {
              id: "3-2-5",
              label: "意识形态",
              parentId: "3-2",
            },
          ],
        },
        {
          id: "3-3",
          label: "中日博弈",
          parentId: "3",
          children: [
            {
              id: "3-3-1",
              label: "政治",
              parentId: "3-3",
              children: [
                {
                  id: "3-3-1-1",
                  label: "政权更迭",
                  parentId: "3-3-1",
                }, {
                  id: "3-3-1-2",
                  label: "选举",
                  parentId: "3-3-1",
                }
              ],
            },
            {
              id: "3-3-2",
              label: "经济",
              parentId: "3-3",
              children: [
                {
                  id: "3-3-2-1",
                  label: "贸易战",
                  parentId: "3-3-2",
                }
              ],
            },
            {
              id: "3-3-3",
              label: "军事",
              parentId: "3-3",
              children: [
                {
                  id: "3-3-3-1",
                  label: "南海问题",
                  parentId: "3-3-3",
                }, {
                  id: "3-3-3-2",
                  label: "台湾问题",
                  parentId: "3-3-3",
                }
              ],
            },
            {
              id: "3-3-4",
              label: "文化",
              parentId: "3-3",
            },
            {
              id: "3-3-5",
              label: "意识形态",
              parentId: "3-3",
            },
          ],
        },
      ]
    },
    {
      id: "4",
      label: "发展态势跟踪",
      children: [
        {
          id: "4-1",
          label: "政策环境态势感知",
          parentId: "4",
          children: [
            {
              id: "4-1-1",
              label: "规划计划",
              parentId: "4-1",
            },
            {
              id: "4-1-2",
              label: "政策解读",
              parentId: "4-1",
            },
          ],
        },
        {
          id: "4-2",
          label: "权威发布态势感知",
          parentId: "4",
          children: [
            {
              id: "4-2-1",
              label: "双边文件",
              parentId: "4-2",
            },
            {
              id: "4-2-2",
              label: "政策颁布",
              parentId: "4-2",
            },
          ],
        },
        {
          id: "4-3",
          label: "联通发展态势感知",
          parentId: "4",
          children: [
            {
              id: "4-3-1",
              label: "政策沟通",
              parentId: "4-3",
            },
            {
              id: "4-3-2",
              label: "设施联通",
              parentId: "4-3",
            },
            {
              id: "4-3-3",
              label: "贸易畅通",
              parentId: "4-3",
            },
            {
              id: "4-3-4",
              label: "资金融通",
              parentId: "4-3",
            },
            {
              id: "4-3-5",
              label: "民心互通",
              parentId: "4-3",
            },
          ],
        },
        {
          id: "4-4",
          label: "国际合作态势感知",
          parentId: "4",
        },
        {
          id: "4-5",
          label: "企业发展态势感知",
          parentId: "4",
          children: [
            {
              id: "4-5-1",
              label: "中企发展",
              parentId: "4-5",
            },
            {
              id: "4-5-2",
              label: "外企发展",
              parentId: "4-5",
            },
          ],
        },
        {
          id: "4-6",
          label: "专家视角态势感知",
          parentId: "4",
          children: [
            {
              id: "4-6-1",
              label: "专家库",
              parentId: "4-6",
            },
            {
              id: "4-6-2",
              label: "国内专家观点",
              parentId: "4-6",
            },
            {
              id: "4-6-2",
              label: "国际专家观点",
              parentId: "4-6",
            },
          ],
        },
      ]
    }
  ]