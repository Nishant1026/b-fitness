const candidates = [
  // Protein / supplement powder / tubs / shakes
  '1579722821273-0f6c7d44362f', // supplement shaker & powder
  '1546069901-ba9599a7e63c',
  '1540420773420-3366772f4999',
  '1584017911766-d451b3d0e843', // pills / supplement bottles
  '1579722820308-d74e571900a9',
  '1584308666744-24d5c474f2ae',
  '1517838277536-f5f99be501cd', // gym workout
  '1517836357463-d25dfeac3438', // gym training
  '1581009146145-b5ef050c2e1e', // gym man
  '1571019614242-c5c5dee9f50b', // gym man training
  '1583454110551-21f2fa2afe61', // man workout
  '1584466977773-e625c37cdd50', // man in gym
  '1556817411-31ae72fa3ea0', // hoodie / workout
  '1518611012118-696072aa579a', // woman workout
  '1506126613408-eca07ce68773', // woman leggings
  '1540497077202-7c8a3999166f', // woman leggings gym
  '1518310383802-640c2de311b2', // woman sports bra
  '1515886657613-9f3515b0c78f', // woman hoodie
  '1515372039744-b8f02a3ae446', // woman jacket
  '1553062407-98eeb64c6a62', // gym bag
  '1588850561407-ed78c282e89b', // cap
  '1584735935682-2f2b69dff9d2', // gloves
  '1602143407151-7111542de6e8', // bottle
  // More fitness images
  '1526506118085-60ce8714f8c5', // gym weights
  '1538805060514-97d9cc17730c', // fitness running
  '1574680096145-d05b474e2155', // workout gym
  '1574680096141-11885a065f37',
  '1534367507873-d2d7e24c797f',
  '1517963879433-6ad2b056d712', // gym deadlift
  '1576678927484-cc907957088c', // gym training
  '1583454155174-a82f3473f8a4', // fitness
  '1599058917212-d750089bc07e', // athletic
  '1507398941214-572c25f4b1dc', // fitness female
  '1483721310020-03333e577078', // running / fitness
  '1521804906057-1df8fdb718b7', // fitness dumbbells
  '1574680088814-c9e8a10d8a4d', // gym
  '1541534741688-6078c6bfb5c5', // workout
  '1550345332-09e3ac987658', // fitness athlete
  '1518611012118-696072aa579a',
  '1584824486509-112e4181ff6b', // fitness nutrition / powder
  '1546069901-ba9599a7e63c', // healthy nutrition
  '1505576399279-565b52d4ac71', // healthy nutrition / bowl
  '1584017911766-d451b3d0e843', // vitamins / supplements
]

async function testCandidates() {
  const valid = []
  for (const id of candidates) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.status === 200) {
        valid.push(id)
      } else {
        console.log(`Candidate ${id} failed: ${res.status}`)
      }
    } catch (e) {
      console.log(`Candidate ${id} error: ${e.message}`)
    }
  }
  console.log(`Valid IDs (${valid.length}):`, JSON.stringify(valid))
}

testCandidates()
