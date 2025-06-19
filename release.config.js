module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
      changelogTitle: '# Changelog'
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'npm run build && npm run test'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    ['@codedependant/semantic-release-docker', (() => {
      const repo = process.env.DOCKERHUB_REPOSITORY || 'EpicMandM/my-python-app';
      const [project, image] = repo.split('/', 2);
      return {
        dockerProject: project,
        dockerImage: image,
        dockerTags: ['{{version}}', 'latest']
      };
    })()]
  ]
};
