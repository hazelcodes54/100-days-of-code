import imageio.v3 as iio


filenames = ['chicklet1.png', 'chicklet2.png', 'chicklet3.png', 'chicklet4.png']
images = []

for filename in filenames:
  images.append(iio.imread(filename))

iio.imwrite('chicklet.gif', images, duration = 500, loop = 0)